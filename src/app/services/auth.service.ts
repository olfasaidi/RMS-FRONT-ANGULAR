import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { RoleService } from './role.service';

const API:string = "http://127.0.0.1:8000";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token:string;
  private _refreshToken:string;
  public _user:BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')))
  public errorReporter:ReplaySubject<any> = new ReplaySubject<any>();

  public get currentUserValue(){
    return this._user.value;
  }

  public get currentToken(){
    return this._token;
  }

  public get refreshToken(){
    return this._refreshToken;
  }

  constructor(private http:HttpClient,private roleService:RoleService) {
    this._token = localStorage.getItem('token');
    this._refreshToken = localStorage.getItem('refreshToken');
    if(this.currentUserValue){
      this.roleService.updateAbility(this.currentUserValue.role)
    }
  }

  login(creds,role){
    this.http.post<any>(API+'/api/login_check',creds).subscribe(res=>{
      
      this._refreshToken = res.refresh_token;
      this._token = res.token;
      localStorage.setItem('token',res.token);
      localStorage.setItem('refreshToken',res.token);

      let decoded = jwt_decode(res.token);
      console.log(decoded);
      let newUser = {username:decoded.username,role}//role:decoded.roles[0]
      localStorage.setItem('user',JSON.stringify(newUser));
      this._user.next(newUser);
      this.roleService.updateAbility(newUser.role);
    },err=>{
      this.errorReporter.next(err.error.message);
      console.log(err)
    })
    return this._user.asObservable();
  }

  logout(){
    return new Promise((resolve,reject)=>{
      this._user.next(null);
      localStorage.clear();
      resolve();
    })
  }

  refreshSession(){
    return new Promise((resolve,reject)=>{
      this.http.post<any>(API+'/api/token/refresh',this.refreshToken).subscribe(res=>{
        this._token = res.token;
        this._refreshToken = res.refresh_token;
        localStorage.setItem('token',res.token);
        localStorage.setItem('refreshToken',res.token);
        resolve()
      },reject)
    })
  }

  register(data){
    // this.http.post<any>(API+'/api/register',data).subscribe(res => {
    //   let decoded = jwt_decode(res.token);
    //   console.log(decoded.data);
    //   if (decoded.data == "company already exist") {
    //     this.errorReporter.next(decoded.data);
    //     return;
    //   }
    //   let newUser = {id:decoded.data[0],name:decoded.data[1],role:decoded.data[2]}
    //   localStorage.setItem('user',JSON.stringify(newUser));
    //   this.user.next(newUser);
    // },err=>{
    //   this.errorReporter.next(err.statusText);
    //   console.log(err)
    // });
    this.errorReporter.next('Server Error !');
    return this._user.asObservable();
  }

  getError(){
    return this.errorReporter.asObservable();
  }
}
