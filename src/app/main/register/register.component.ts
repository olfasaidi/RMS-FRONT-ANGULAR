import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";
import {
    Validators,
    ValidationErrors,
    FormGroup,
    FormControl,
    FormGroupDirective,
} from "@angular/forms";
import { MatStepper } from "@angular/material/stepper";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";
import { fuseAnimations } from "@fuse/animations";
import { AuthService } from "app/services/auth.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    animations: fuseAnimations,
})
export class RegisterComponent implements OnInit {
    isUserLoggedIn = false;
    isLoading: boolean = false;
    panelOpenState = true;
    errorMsg: string;
    wrongInput: string;

    public passwordsNotMatch: boolean;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.email, Validators.required]),
        motpass: new FormControl("", Validators.required),
        role: new FormControl('ROLE_ADMIN',Validators.required)
    });

    role = new FormControl('ROLE_ADMIN');

    personalInfo: FormGroup;

    nbOfUsers: FormControl = new FormControl(6, Validators.required);

    addUserForm: FormGroup;

    technicalInfo: FormGroup;

    acceptTerms: FormControl = new FormControl(false, Validators.required);

    formControlArr: string[];

    get quotaExceeded(): boolean {
        let maxUsers = this.nbOfUsers.value;
        let nb =
            this.admins.length +
            this.managers.length +
            this.editors.length +
            this.viewers.length;
        return nb >= maxUsers;
    }

    get staffcount(): number {
        return (
            this.admins.length +
            this.managers.length +
            this.editors.length +
            this.viewers.length
        );
    }

    admins = [
        {
          name: "spencer",
          email: "spencer@mail.com",
          role: "admins"
        }
    ];
    managers = [
        {
          name: "spencer",
          email: "spencer@mail.com"
        }
    ];
    editors = [
        {
          name: "spencer",
          email: "spencer@mail.com"
        }
    ];
    viewers = [
        {
          name: "spencer",
          email: "spencer@mail.com"
        }
    ];

    constructor(
        private _fuseConfigService: FuseConfigService,
        private router: Router,
        private _snackBar: MatSnackBar,
        private authService: AuthService
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };

        this.personalInfo = new FormGroup(
            {
                name: new FormControl("tester", [
                    Validators.required,
                    Validators.minLength(5),
                ]),
                email: new FormControl("Company10@mail.com", [
                    Validators.required,
                    Validators.email,
                ]),
                motpass: new FormControl("123456", [
                    Validators.required,
                    Validators.minLength(6),
                ]),
                confpass: new FormControl("123456", Validators.required),
                adresse: new FormControl(
                    "company address",
                    Validators.required
                ),
                city: new FormControl("company city", Validators.required),
                codepostal: new FormControl("2021", Validators.required),
                numtel: new FormControl("12345678", Validators.required),
                website: new FormControl(
                    "www.company10.com",
                    Validators.required
                ),
                description: new FormControl("Some text", Validators.required),
                activity: new FormControl("produceeer", Validators.required),
                sector: new FormControl("medicine", Validators.required),
                file: new FormControl("something.png", Validators.required),
            },
            { validators: this.checkPasswordmatch }
        );

        this.formControlArr = Object.keys(this.personalInfo.controls);

        this.technicalInfo = new FormGroup({
            period_subscription: new FormControl("12", Validators.required),
            databasesize: new FormControl('20', Validators.required),
            slatype: new FormControl("15", Validators.required),
            supporttype: new FormControl("support1", Validators.required),
        });

        this.addUserForm = new FormGroup({
            name: new FormControl("", Validators.required),
            email: new FormControl("", [Validators.required, Validators.email]),
            role: new FormControl("admins", Validators.required),
        });
    }

    login() {
        this.isLoading = true;
        const creds = this.loginForm.value;
        let role = creds.role;
        delete creds.role;
        if (this.loginForm.valid) {
            console.log(creds);
            this.authService.login(creds,role).subscribe((res) => {
                if (res) this.router.navigate([""]);
            });
        } else {
            this.isLoading = false;
            this.openSnackBar("Please verify your input");
        }
    }

    addUser(formDirective: FormGroupDirective) {
        console.log(this.addUserForm.value);
        if (this.addUserForm.valid) {
            if (!this.quotaExceeded) {
                let formValue = this.addUserForm.value;
                console.log(formValue);
                if (!this.userExists(formValue.email)) {
                    this[formValue.role].push(formValue);
                    this.addUserForm.reset({
                        name: "",
                        email: "",
                        role: "admins",
                    });
                    formDirective.resetForm({
                        name: "",
                        email: "",
                        role: "admins",
                    });
                }else{
                    this.openSnackBar("You already added this user.");
                }
            }
        } else {
            if (
                this.addUserForm.hasError("required", "email") ||
                this.addUserForm.hasError("email", "email")
            ) {
                this.openSnackBar("Please enter a valid email.");
            }
            if (this.addUserForm.hasError("required", "name")) {
                this.openSnackBar("Please enter a valid name.");
            }
        }
    }

    removeUser(u) {
        console.log(u);
        let role = u.role;
        let index = this[role].indexOf(u);
        this[role].splice(this[role].indexOf(u), 1);
        // let users = [...this.admins,...this.managers,...this.editors,...this.viewers];
        // console.log(u)
        // console.log(users)
        // users.splice(users.indexOf(u),1);
    }

    userExists(email) {
        let users = [
            ...this.admins,
            ...this.managers,
            ...this.editors,
            ...this.viewers,
        ];
        for (let u of users) {
            if (u.email === email) {
                return true;
            }
        }
        return false;
    }

    submitPersonalInfo(stepper: MatStepper) {
        stepper.next();
    }

    finish() {
        this.router.navigate([""]);
    }

    submitAll(stepper) {
        this.isLoading = true;
        let employee = [[], [], [], []];
        for (let u of this.admins) {
            employee[0].push(u.email);
        }
        for (let u of this.managers) {
            employee[1].push(u.email);
        }
        for (let u of this.editors) {
            employee[2].push(u.email);
        }
        for (let u of this.viewers) {
            employee[3].push(u.email);
        }
        let data = {
            ...this.personalInfo.value,
            ...this.technicalInfo.value,
            staffcount: this.nbOfUsers.value,
            status: true,
            employee,
        };
        data.period_subscription = this.dateify(data.period_subscription);
        data.databasesize = Number(data.databasesize);
        delete data.confpass;
        console.log(Object.keys(data).length);
        console.log(data);
        this.authService.register(data).subscribe((res) => {
            if (res) {
                stepper.next();
                this.isLoading = false;
            } //this.router.navigate([""]);
        });
    }

    dateify(months){
        let time = Date.now();
        let subperiod = Number(months)* 30 * 24 * 60 * 60 * 1000;
        let date = new Date(time + subperiod);
        return date.toISOString();
    }

    // MonthToMs(month: number) {
    //     return month * 30 * 24 * 60 * 60 * 1000;
    // }

    checkPasswordmatch(control: FormGroup): null | ValidationErrors {
        const pass = control.get("motpass");
        const conf = control.get("confpass");
        return pass && conf && pass.value === conf.value
            ? null
            : { passwordsNotMatch: true };
    }

    getControlValue(id) {
        return this.personalInfo.get(id);
    }

    test() {
        console.log(this.personalInfo.value);
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, "close", {
            duration: 2000,
        });
    }

    // resetForms(){
    //     console.log('reset')
    //     // this.loginForm.reset()
    //     // this.personalInfo.reset()
    //     // this.addUserForm.reset()
    //     // this.technicalInfo.reset()
    // }

    stepChanged(event, stepper) {
        stepper.selected.interacted = false;
    }

    ngOnInit(): void {
        if (this.authService.currentUserValue) this.router.navigate([""]);
        this.authService.getError().subscribe((res) => {
            this.openSnackBar(res);
            this.isLoading = false;
        });
    }
}
