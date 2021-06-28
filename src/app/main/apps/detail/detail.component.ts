import { Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Item } from 'app/main/apps/detail/item.model';
import { DetailService } from 'app/main/apps/detail/detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'app/services/role.service';
import { AppAbility } from 'app/services/app.ability';

@Component({
    selector     : 'e-commerce-detail',
    templateUrl  : './detail.component.html',
    styleUrls    : ['./detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DetailComponent implements OnInit, OnDestroy
{
    public model = this.route.snapshot.data.model;
    public modelName:string = this.route.snapshot.data.modelName;
    public lowName:string = this.modelName.toLowerCase();
    public listName:string = this.route.snapshot.data.listName;
    public suffix:string = this.route.snapshot.data.url;
    public permissions:any;

    item: Item;
    pageType: string;
    itemForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceItemService} _ecommerceItemService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _ecommerceItemService: DetailService,
        private _formBuilder: FormBuilder,
        //private _location: Location,
        private _matSnackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        //private roleService: RoleService,
        private ability: AppAbility,
        private cdRef: ChangeDetectorRef
    )
    {
        // Set the default
        this.item = new Item();

        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.permissions = {
            add:this.ability.can('add',this.lowName),
            modify:this.ability.can('modify',this.lowName),
            delete:this.ability.can('delete',this.lowName),
        }
        console.log(this.permissions);
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        console.log(this.modelName)
        // Subscribe to update Item on changes
        this._ecommerceItemService.onItemChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(item => {

                if ( item )
                {
                    this.item = new Item(item);
                    this.pageType = 'edit';
                }
                else
                {
                    this.pageType = 'new';
                    this.item = new Item();
                }

                this.itemForm = this.createItemForm();
                if(!this.permissions.add && !this.permissions.modify){
                    this.itemForm.disable();
                }
                this.cdRef.detectChanges();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create item form
     *
     * @returns {FormGroup}
     */
    createItemForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.item.id],
            name            : [this.item.name],
            handle          : [this.item.handle],
            description     : [this.item.description],
            categories      : [this.item.categories],
            project         : [this.item.project],
            images          : [this.item.images],
            price           : [this.item.price],
            territories     : [this.item.territories],
            creator         : [this.item.creator],
            link            : [this.item.link],
            media           : [this.item.media],
            active          : [this.item.active],

            email           :[this.item.email],
            password         :[this.item.password],
            address         :[this.item.address],
            website         :[this.item.website],
            postalCode      :[this.item.postalCode],
            city            :[this.item.city],
            telephone       :[this.item.telephone],
            sector          :[this.item.sector],
            staffcount      :[this.item.staffcount],
            activity        :[this.item.activity],
            subPeriod       :[this.item.subPeriod],
            databaseSize    :[this.item.databaseSize],
            supportType     :[this.item.supportType],
            slaType         :[this.item.slaType],
            employee        :[this.item.employee]
        });
    }

    /**
     * Save item
     */
    saveItem(): void
    {
        const data = this.itemForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._ecommerceItemService.saveItem(data,this.suffix,this.modelName)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceItemService.onItemChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Item saved', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            }).catch(err=>{
                console.log(err)
                this._matSnackBar.open('error occured', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    deleteItem(): void
    {
        const data = this.itemForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._ecommerceItemService.deleteItem(data,this.suffix,this.modelName)
            .then((res) => {

                // Trigger the subscription with new data
                this._ecommerceItemService.onItemChanged.next(data);

                // Show the success message
                this._matSnackBar.open(res, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                this.router.navigate([this.listName])
            }).catch(err=>{
                this._matSnackBar.open(err, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }

    /**
     * Add item
     */
    addItem(): void
    {
        const data = this.itemForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._ecommerceItemService.addItem(data,this.suffix,this.modelName)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceItemService.onItemChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Item added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this.router.navigate([this.listName])
            }).catch(err=>{
                console.log(err)
                this._matSnackBar.open(err, 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });
            });
    }
}
