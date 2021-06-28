import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
    ActivatedRoute,
    Router,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { ListService } from "../list/list.service";
import { Location } from '@angular/common';
import { AuthService } from 'app/services/auth.service';

@Injectable()
export class DetailService implements Resolve<any> {
    API: string = "http://127.0.0.1:8000";
    routeParams: any;
    item: any;
    onItemChanged: BehaviorSubject<any>;
    public suffix;//

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _listService: ListService,
        private _location: Location,
        private _route: ActivatedRoute,
        private authService: AuthService,
        private router:Router,
    ) {
        // Set the defaults
        
        this.onItemChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;
        this.suffix = route.data.url;
        return new Promise((resolve, reject) => {
            Promise.all([this.getItem()]).then(() => {
                resolve();
            }, reject).catch(err=>this._location.go(''));
        });
    }

    /**
     * Get item
     *
     * @returns {Promise<any>}
     */
    getItem(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onItemChanged.next(false);
                resolve(false);
            } else {
                let prod;
                this._listService.getItemById(this.routeParams.id,this.suffix).then(p=>{
                    prod = p;
                    if (prod) {
                        this.item = prod;
                        this.onItemChanged.next(this.item);
                        resolve(prod);
                    }else{
                        reject;
                    }
                }).catch(err =>{
                    console.log(err)
                    prod = null;
                    reject(err);
                })
            }
        });
    }

    /**
     * Save item
     *
     * @param item
     * @returns {Promise<any>}
     */
    saveItem(item, suffix, modelName): Promise<any> {
        let payload = this.matchModel(item, modelName,'put');
        console.log(payload);
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(this.API + suffix+'/'+item.id, payload)
                .subscribe((response: any) => {
                    console.log(response);
                    if (response.includes("successfully ")) {
                        resolve(response);
                    }
                    reject(response);
                },err=>{
                    if(err.error.message && err.error.message === 'Expired JWT Token'){
                        this.authService.logout().then(()=>this.router.navigate(['register']));
                        reject('Session Expired');
                    }
                    console.log(err)
                    reject('error occured');
                });
        });
    }

    deleteItem(item, suffix, modelName): Promise<any> {
        //let payload = this.matchModel(item, modelName,'delete');
        console.log(item.id);
        return new Promise((resolve, reject) => {
            this._httpClient
                .request('delete',this.API + suffix+'/'+item.id)
                .subscribe((response: any) => {
                    console.log(response);
                    if (response.includes("Deleted")) {
                        resolve(response);
                    }
                    reject(response);
                },err=>{
                    if(err.error.message && err.error.message === 'Expired JWT Token'){
                        this.authService.logout().then(()=>this.router.navigate(['register']));
                        reject('Session Expired');
                    }
                    console.log(err)
                    reject('Server error');
                });
        });
    }

    /**
     * Add item
     *
     * @param item
     * @returns {Promise<any>}
     */
    addItem(item, suffix, modelName): Promise<any> {
        let payload = this.matchModel(item, modelName,'post');
        console.log(payload);
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(this.API + suffix, payload)
                .subscribe((response: any) => {
                    console.log(response);
                    if (response.includes("successfully")) {
                        resolve(response);
                    }
                    reject(response);
                }, err=>{
                    if(err.error.message && err.error.message === 'Expired JWT Token'){
                        this.authService.logout().then(()=>this.router.navigate(['register']));
                        reject('Session Expired');
                    }
                    console.log(err);
                    reject(err.statusText)
                });
        });
    }

    dateify(months){
        let time = Date.now();
        let subperiod = Number(months)* 30 * 24 * 60 * 60 * 1000;
        let date = new Date(time + subperiod);
        return date.toISOString();
    }

    matchModel(item, modelName,request) {
        let payload = {};
        switch (modelName) {
            case "Product":
                if(request==='post'){
                    payload = {
                        nom: item.name,
                        logo: "NoImageSystemYet.JPG",
                        type: item.categories[0],
                        prix: item.price,
                        description: item.description,
                        project: item.project,
                    };
                }else if(request==='delete'){
                    payload = {
                        id: item.id,
                    };
                }else{
                    payload = {
                        //id: item.id,
                        nom: item.name,
                        logo: "NoImageSystemYet.JPG",
                        type: item.categories[0],
                        prix: item.price,
                        description: item.description,
                        presentations: [item.project],
                    };
                }
                break;
            case "Project":
                if (request==='post') {
                    payload = {
                        titre: item.name,
                        logo: "NoImageSystemYet.JPG",
                        territories: item.territories,
                        project_creator: item.creator,
                        status: item.active,
                    };
                }else if(request==='delete'){
                    payload = {
                        id: item.id,
                    };
                }else{
                    payload = {
                        //id: item.id,
                        titre: item.name,
                        logo: "NoImageSystemYet.JPG",
                        territories: item.territories,
                        status: item.active,
                    };
                }
                
                break;
            case "Company":
                if(request==='post'){
                    payload = {
                        name: item.name,
                        file: "NoImageSystemYet.JPG", //add this
                        description: item.description,
                        status: item.active,
                        email: item.email,
                        motpass: item.password, //leave this
                        adresse: item.address,
                        codepostal: item.postalCode,
                        city: item.city,
                        website: item.website, //add this
                        numtel: item.telephone,
                        sector: item.sector,
                        staffcount: item.staffcount,
                        activity: item.activity,
                        period_subscription: this.dateify(item.subPeriod),
                        databasesize: item.databaseSize,
                        supporttype: item.supportType,
                        slatype: item.slaType,
                        employee: item.employee, //leave this
                    };
                }else if(request==='delete'){
                    payload = {
                        id: item.id,
                    };
                }else{
                    payload = {
                        //id: item.id,
                        name: item.name,
                        file: "NoImageSystemYet.JPG", //add this
                        description: item.description,
                        status: item.active,
                        email: item.email,
                        
                        adresse: item.address,
                        
                        
                        website: item.website, //add this
                        numtel: item.telephone,
                        sector: item.sector,
                        staffcount: item.staffcount,
                        activity: item.activity,
                        period_subscription: this.dateify(item.subPeriod),
                        databasesize: Number(item.databaseSize),
                        supporttype: item.supportType,
                        slatype: item.slaType,
                        
                    };
                }
                break;
            case "Presentation":
                if(request==='post'){
                    payload = {
                        titre: item.name,
                        territories: item.territories,
                        presentation_creator: item.creator,
                        project: [item.project],
                        media:item.media
                    };
                }else if(request==='delete'){
                    payload = {
                        id: item.id,
                    };
                }else{
                    payload = {
                        //id: item.id,
                        titre: item.name,
                        territories: item.territories,
                        project: [item.project],
                        media:item.media
                    };
                }
                break;
            case "Media":
                if(request==='post'){
                    payload = {
                        titre: item.name,
                        description: item.description,
                        lien: item.link,
                        type: item.categories[0],
                    };
                }else if(request==='delete'){
                    payload = {
                        id: item.id,
                    };
                }else{
                    payload = {
                        //id: item.id,
                        titre: item.name,
                        description: item.description,
                        lien: item.link,
                        type: item.categories[0],
                    };
                }
                break;
            case "Reference":
                if(request==='post'){
                    payload = {
                        titre: item.name,
                        description: item.description
                    };
                }else if(request==='delete'){
                    payload = {
                        id: item.id,
                    };
                }else{
                    payload = {
                        //id: item.id,
                        titre: item.name,
                        description: item.description
                    };
                }
                break;
            default:
                break;
        }
        return payload;
    }
}
