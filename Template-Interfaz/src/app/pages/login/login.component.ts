import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logoImgSrc: string = '../../../../assets/images/logo-ciifen.png';
  constructor(private router : Router) { }

  ngOnInit() {
    console.log(this.getCookie("tipo"))
  }


  onSubmit_Login(user: string, password: string) {
    var correcto = true;
    fetch('http://127.0.0.1:3000/login')
    .then(texto => texto.json())
    .then(datos => {
      if (user == "" && password == "") {
        alert("Complete todos los campos");
      }
      for (let usuario of datos) {
        console.log(usuario)
        // If response comes hideloader() function is called
        // to hide that loader
        if(usuario[3] == password && usuario[1] == user || usuario[2] == user ){
       
          
          document.cookie = "username=" + usuario[1]+";path=/";
          document.cookie = "tipo=" + usuario[4]+";path=/";
          document.cookie = "identificador=" + usuario[0]+";path=/";
         
          correcto = false;
          window.location.href = 'http://localhost:4200/pages/database';
          break;

        } 
      }if(user != "" && password != "" && correcto) {
        alert("Datos incorrectos");
      }
      }
      
      );
      

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
