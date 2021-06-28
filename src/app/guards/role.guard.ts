import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { RoleService } from 'app/services/role.service';

@Injectable({
    providedIn: "root",
})
export class RoleGuard implements CanActivate {
    constructor(private role:RoleService,private router:Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.checkPermission(next);
    }

    checkPermission(next:ActivatedRouteSnapshot) {
      if(this.role.canNavigate(next.data.modelName)){
        return true;
      }
      this.router.navigate(['']);
      return false;
    }
}
