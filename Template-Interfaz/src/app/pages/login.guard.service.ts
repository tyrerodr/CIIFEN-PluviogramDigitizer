import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router, Route  } from '@angular/router';


import { Injectable } from '@angular/core';
import { loginService } from './login/login.service';

@Injectable()
export class loginGuardService implements CanActivate{
    constructor(private tipoUsuario: loginService,private _router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const resultado = this.tipoUsuario.UsuarioLogin();
        if(resultado){
            return true;
        }
        else{
            this._router.navigate([('login')]);
            return false;
        }
    };
}