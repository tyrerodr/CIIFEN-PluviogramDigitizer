import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router, Route  } from '@angular/router';


import { Injectable } from '@angular/core';
import { loginService } from '../login/login.service';

@Injectable()
export class DigitalizadorGuardService implements CanActivate{
    constructor(private tipoUsuario: loginService,private _router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const resultado=this.tipoUsuario.UsuarioDigitalizador();
        const resultado2=this.tipoUsuario.UsuarioAdministrador();
        if(resultado || resultado2){       
            return true;
        }
        else{
            
            if(this.tipoUsuario.UsuarioLogin()){
                alert("No tiene los permisos necesarios para acceder a esta página");
                return false;
            }
            
            this._router.navigate([('login')]);
            return false;
        }
    };
}