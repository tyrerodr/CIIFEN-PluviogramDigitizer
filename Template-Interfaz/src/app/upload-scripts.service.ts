import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadScriptsService {

  constructor() { }
  upload(files:String[]){
    for(let oneFile of files){
      let script = document.createElement("script");
      script.src = "./assets/js/" + oneFile + ".js";
      let body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
}
