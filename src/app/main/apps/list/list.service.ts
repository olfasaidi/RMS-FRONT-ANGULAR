import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
    Router,
} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { FuseUtils } from "@fuse/utils";
import { AuthService } from "app/services/auth.service";

@Injectable()
export class ListService implements Resolve<any> {
    API: string = "http://127.0.0.1:8000";
    list: any[];
    onListChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {
        // Set the defaults
        this.onListChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getList(route.data.url)]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get list
     *
     * @returns {Promise<any>}
     */
    getList(suffix): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.API + suffix).subscribe(
                (response: any) => {
                    let items = this.matchModel(response);
                    this.list = items;
                    this.onListChanged.next(this.list);
                    resolve(items);
                },
                (err) => {
                    console.log(err);
                    if (
                        err.error.message &&
                        err.error.message === "Expired JWT Token"
                    ) {
                        this.authService
                            .logout()
                            .then(() => this.router.navigate(["register"]));
                        reject("Session Expired");
                    }
                    reject(err);
                }
            );
        });
    }

    getItemById(id, suffix) {
        return new Promise((resolve, reject) => {
            console.log(this.API + suffix);
            if (this.list) resolve(this.list.find((i) => i.id === Number(id)));
            this._httpClient.get(this.API + suffix).subscribe(
                (response: any) => {
                    let items = this.matchModel(response);
                    console.log(items);
                    resolve(items.find((i) => i.id === Number(id)));
                },
                (err) => {
                    if (
                        err.error.message &&
                        err.error.message === "Expired JWT Token"
                    ) {
                        this.authService
                            .logout()
                            .then(() => this.router.navigate(["register"]));
                        reject("Session Expired");
                    }
                    reject(err);
                }
            );
        });
    }

    dateify(months) {
        let time = Date.now();
        let subperiod = Number(months) * 30 * 24 * 60 * 60 * 1000;
        let date = new Date(time + subperiod);
        return date.toISOString();
    }

    unDateify(months) {
        let time = Date.now();
        let subperiod = Number(months) * 30 * 24 * 60 * 60 * 1000;
        let date = new Date(time + subperiod);
        return date.toISOString();
    }

    matchModel(rawList) {
        let list = [];
        for (let i of rawList) {
            let dbs;
            if (i.databasesize) {
                dbs = i.databasesize.toString();
            }
            let newItem = {
                id: i.id,
                name: i.name || i.nom || i.titre || "",
                description: i.description || "",
                category: i.type || i.category || "",
                sector: i.sector || "",
                activity: i.activity || "",
                staffcount: i.staffcount || 0,
                territories: i.territories || "",
                creator: i.presentationCreator || "",
                link: i.lien || "",
                price: i.prix || 0,
                active: i.status || true,

                email: i.email || "",
                address: i.adresse || "",
                telephone: i.numtel || "",
                website: i.website || "",
                subPeriod: "12",
                databaseSize: dbs || "",
                supportType: i.supporttype || "",
                slaType: i.slatype || "",

                media: i.media || [],

                featuredImageId: 1,
                images: [
                    {
                        id: 0,
                        url:
                            "assets/images/ecommerce/product-image-placeholder.png",
                        type: "image",
                    },
                    {
                        id: 1,
                        url:
                            "assets/images/ecommerce/a-walk-amongst-friends.jpg",
                        type: "image",
                    },
                ],
            };
            list.push(newItem);
        }
        return list;
    }
}
