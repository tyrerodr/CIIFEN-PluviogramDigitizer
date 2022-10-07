import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router  } from '@angular/router';


import { Injectable } from '@angular/core';
import { loginService } from '../login/login.service';

@Injectable()
export class loginGuardService implements CanActivate{
    constructor(private userType: loginService,private _router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const response = this.userType.loginUser();
        if(response){
            return true;
        }
        else{
            this._router.navigate([('login')]);
            return false;
        }
    };
}