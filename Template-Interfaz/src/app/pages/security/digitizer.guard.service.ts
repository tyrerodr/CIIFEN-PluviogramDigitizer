import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router , Route } from '@angular/router';


import { Injectable } from '@angular/core';
import { loginService } from '../login/login.service';

@Injectable()
export class DigitizerGuardService implements CanActivate{
    constructor(private typeUser: loginService,private _router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const response1=this.typeUser.digitizerUser();
        const response2=this.typeUser.adminUser();
        if(response1 || response2){       
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