import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router  } from '@angular/router';


import { Injectable } from '@angular/core';
import { loginService } from '../login/login.service';

@Injectable()
export class AdminGuardService implements CanActivate{
    constructor(private typeUser: loginService,private _router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const response=this.typeUser.adminUser();
        if(response){
            return true;
        }
        else{
            if(this.typeUser.loginUser()){
                alert("No tiene los permisos necesarios para acceder a esta página");
                return false;
            }
            
            this._router.navigate([('login')]);
            return false;
        }
    };
}