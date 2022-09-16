import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../cargar-scripts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tableData: Array<any>;
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;
  
  x:{
    id: number,
    firstName: string,
    contrasena: string,
    username: string,
    email: string,
    estado: string,
    tipo: string
};


DATA: Array<{
    id: number,
    firstName: string,
    contrasena: string,
    username: string,
    email: string,

    estado: string,
    tipo: string
}>=[]; 


constructor(private _CargarScripts:CargarScriptsService) 
{
  _CargarScripts.Carga(["tablas","actualizar"]);
}  


ngOnInit() {
  this.loadData();
}

loadData() {
   
    fetch('http://127.0.0.1:3000/users')
.then(texto => texto.json())
.then(datos => {
    for (let users of datos) {
        if(users[6] == '1'){
            users[6] = 'activo'
        }else{
            users[6] = 'inactivo'
        }
        this.x={
            id: users[0],
            firstName: users[4],
            contrasena: users[3],
            username: users[1],
            email: users[2],            
            estado: users[6],
            tipo: users[5]
        };
        this.DATA.push(this.x);
    }

    
  this.tableData = this.DATA;
})}

pageChanged(pN: number): void {
  this.pageNumber = pN;
}




}
