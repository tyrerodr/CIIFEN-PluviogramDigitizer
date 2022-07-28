import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { loginService } from '../../../pages/login/login.service';
import { LoginComponent } from '../../../pages/login/login.component';

@Component({
  selector: 'right-config',
  templateUrl: './right-config.component.html',
  styleUrls: ['./right-config.component.scss']
})
export class RightConfigComponent implements OnInit {
  userName: string = 'Usuario';
  userPost: string = 'FrontEnd';
  isConfigToggle: boolean = false;
  constructor(private _globalService: GlobalService) { }

  ngOnInit() { 
    document.getElementById('textouser')!.textContent = this.getCookie("username");
    document.getElementById('textotipo')!.textContent = 'Usted es un '+this.getCookie("tipo");
    this.asignarLogout();
  }

  configToggle() {
    this.isConfigToggle = !this.isConfigToggle;
    //this._globalService._sidebarToggleState(!this.isConfigToggle);
    this._globalService.dataBusChanged('sidebarToggle', !this.isConfigToggle);
  }

  asignarLogout(){
    document.getElementById('logout')!.addEventListener('click', function () {

      document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:01 UTC;"+"path=/";
      document.cookie = "tipo=; expires=Thu, 01 Jan 1970 00:00:01 UTC;"+"path=/";
      document.cookie = "identificador=; expires=Thu, 01 Jan 1970 00:00:01 UTC;"+"path=/";  
      location.reload();
      window.location.href = 'http://localhost:4200/login';
    });
  }

  
  getCookie(cname: String) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  } 
}
