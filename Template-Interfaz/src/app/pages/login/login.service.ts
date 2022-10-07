import { Injectable } from '@angular/core';

@Injectable()
export class loginService {

  constructor() { }

  upload(files:String[]){
    for(let file of files){
      let script = document.createElement("script");
      script.src = "./assets/js/" + file + ".js";
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

  loginUser(){
    if (this.getCookie("type")==""){
      return false
    }
      return true
  }

  digitizerUser(){
    if (this.getCookie("type")==""){
      return false
    }
    else if (this.getCookie("type")=="digitalizador"){
      return true
    }
  }

  adminUser(){
    if (this.getCookie("type")==""){
      return false
    }
    else if (this.getCookie("type")=="administrador"){
      return true
    }
  }

  technicalUser(){
    if (this.getCookie("type")==""){
      return false
    }
    else if (this.getCookie("type")=="técnico"){
      return true
    }
  }
}
