import { Injectable } from "@angular/core";
import { Ability, AbilityBuilder } from "@casl/ability";
import { AppAbility } from "./app.ability";
import { BehaviorSubject } from "rxjs";

interface Permissions {
    add: boolean;
    modify: boolean;
    view: boolean;
    disable: boolean;
    delete: boolean;
}

@Injectable({
    providedIn: "root",
})
export class RoleService {
    public permissions: BehaviorSubject<Permissions> = new BehaviorSubject<Permissions>(
        {
            add: false,
            modify: false,
            view: false,
            disable: false,
            delete: false,
        }
    );

    private _allowedRoutes = [];
    private _viewOnly: boolean;
    private _allowedSubRoutes: string[];

    public get allowedRoutes() {
        return this._allowedRoutes;
    }

    public get allowedSubRoutes() {
        return this._allowedSubRoutes;
    }

    public get viewOnly() {
        return this._viewOnly;
    }

    constructor(private ability: AppAbility) {}

    canNavigate(route: string): boolean {
        console.log(this._allowedRoutes);
        return this._allowedRoutes.includes(route.toLowerCase());
    }

    updateAbility(role) {
        let testR = "ROLE_VIEWER";
        console.log(role);
        const { can, rules } = new AbilityBuilder(AppAbility);
        switch (role) {
            case "ROLE_SUPERADMIN":
                can(
                    ["add", "modify", "view", "disable", "delete"],
                    [
                        "media",
                        "presentation",
                        "product",
                        "project",
                        "reference",
                        "user",
                        "company",
                    ]
                );
                can("view", "logs");
                this._allowedRoutes = [
                    "media",
                    "presentation",
                    "product",
                    "project",
                    "reference",
                    "company",
                ];
                this._allowedSubRoutes = [
                    "add-media",
                    "add-presentation",
                    "add-product",
                    "add-project",
                    "add-reference",
                    "add-company",
                ];
                break;

            case "ROLE_ADMIN":
                can(
                    ["add", "modify", "view", "disable", "delete"],
                    [
                        "media",
                        "presentation",
                        "product",
                        "project",
                        "reference",
                        "user",
                    ]
                );
                can("view", "logs");
                can(["modify", "disable", "delete", "view"], "company");
                this._allowedRoutes = [
                    "media",
                    "presentation",
                    "product",
                    "project",
                    "reference",
                    "company",
                ];
                this._allowedSubRoutes = [
                    "add-media",
                    "add-presentation",
                    "add-product",
                    "add-project",
                    "add-reference",
                ];
                break;

            case "ROLE_MANAGER":
                can(
                    ["add", "modify", "view", "disable", "delete"],
                    ["media", "presentation", "product", "project", "reference"]
                );
                can("view", "logs");
                this._allowedRoutes = [
                    "media",
                    "presentation",
                    "product",
                    "project",
                    "reference",
                ];
                this._allowedSubRoutes = [
                    "add-media",
                    "add-presentation",
                    "add-product",
                    "add-project",
                    "add-reference",
                ];
                break;

            case "ROLE_EDITOR":
                can(["modify", "view"], ["presentation", "project"]);
                can(
                    ["add", "modify", "view", "delete"],
                    ["media", "product", "reference"]
                );
                this._allowedRoutes = [
                    "media",
                    "presentation",
                    "product",
                    "project",
                    "reference",
                ];
                this._allowedSubRoutes = [
                    "add-media",
                    "add-product",
                    "add-reference",
                ];
                break;

            case "ROLE_VIEWER":
                can(
                    ["view"],
                    ["media", "presentation", "product", "project", "reference"]
                );
                this._allowedRoutes = [
                    "media",
                    "presentation",
                    "product",
                    "project",
                    "reference",
                ];
                this._allowedSubRoutes = [];
                this._viewOnly = true;
                break;
            default:
                can(
                    ["view"],
                    ["media", "presentation", "product", "project", "reference"]
                );
                this._allowedRoutes = [
                    "media",
                    "presentation",
                    "product",
                    "project",
                    "reference",
                ];
                this._viewOnly = true;
                break;
        }
        this.ability.update(rules);
    }
}


