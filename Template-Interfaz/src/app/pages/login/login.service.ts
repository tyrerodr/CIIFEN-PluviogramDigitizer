import { Injectable } from '@angular/core';

@Injectable()
export class loginService {

  constructor() { }

  Carga(archivos:String[]){
    for(let archivo of archivos){
      let script = document.createElement("script");
      script.src = "./assets/js/" + archivo + ".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
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

  UsuarioLogin(){

    if (this.getCookie("tipo")==""){
      return false
    }

      return true


  }

  UsuarioDigitalizador(){
    if (this.getCookie("tipo")==""){
      return false
    }
    else if (this.getCookie("tipo")=="digitalizador"){
      return true
    }
  }

  UsuarioAdministrador(){
    if (this.getCookie("tipo")==""){
      return false
    }
    else if (this.getCookie("tipo")=="administrador"){
      return true
    }
  }

  UsuarioTecnico(){
    if (this.getCookie("tipo")==""){
      return false
    }
    else if (this.getCookie("tipo")=="técnico"){
      return true
    }
  }
}
