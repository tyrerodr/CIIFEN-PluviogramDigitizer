import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Md5} from "md5-typescript";
import swal from 'sweetalert2';
import { UploadScriptsService } from '../../upload-scripts.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logoImgSrc: string = '../../../../assets/images/logo-ciifen.png';
  constructor(private _UploadScripts:UploadScriptsService, private router : Router) { 
    _UploadScripts.upload(["login"]);
  }

  ngOnInit() {
  }
  onSubmit_Login(user: string, password: string) {
    var istrue = true;
    fetch('http://127.0.0.1:3000/login')
    .then(text => text.json())
    .then(data => {
      if (user == "" && password == "") {
        swal({
          type: 'error',
          title: 'Complete todos los datos!',
          text: 'Campos sin llenar.',
          confirmButtonText:'Ok',
          confirmButtonColor: '#0f436b',
        });
      }
      for (let oneUser of data) {
        console.log(oneUser[3] + "-------"+ Md5.init(password));
        if(oneUser[3] == Md5.init(password) && oneUser[1] == user || oneUser[2] == user ){
          document.cookie = "username=" + oneUser[1]+";path=/";
          document.cookie = "type=" + oneUser[5]+";path=/";
          document.cookie = "id=" + oneUser[0]+";path=/";
          istrue = false;
          window.location.href = 'http://localhost:4200/pages/database';
          break;
        } 
      }if(user != "" && password != "" && istrue) {
        swal({
          type: 'error',
          title: 'Datos Incorrectos!',
          text: 'Usuario o Contraseña incorrectos.',
          confirmButtonText:'Ok',
          confirmButtonColor: '#0f436b',
        });
      }
      }
      );
  } 


}
