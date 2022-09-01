import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from './../../cargar-scripts.service';

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

/*= [
    {
        id: 1,
        firstName: 'Mark',
        contrasena: 'Otto',
        username: '@mdo',
        email: 'mdo@gmail.com',
        age: '28',
        estado: 'Activo'
    },
    {
        id: 2,
        firstName: 'Jacob',
        contrasena: 'Thornton',
        username: '@fat',
        email: 'fat@yandex.ru',
        age: '45',
        estado: 'Activo'
    },
    {
        id: 3,
        firstName: 'Larry',
        contrasena: 'Bird',
        username: '@twitter',
        email: 'twitter@outlook.com',
        age: '18',
        estado: 'Activo'
    },
    {
        id: 4,
        firstName: 'John',
        contrasena: 'Snow',
        username: '@snow',
        email: 'snow@gmail.com',
        age: '20',
        estado: 'Activo'
    },
    {
        id: 5,
        firstName: 'Jack',
        contrasena: 'Sparrow',
        username: '@jack',
        email: 'jack@yandex.ru',
        age: '30',
        estado: 'Activo'
    },
    {
        id: 6,
        firstName: 'Ann',
        contrasena: 'Smith',
        username: '@ann',
        email: 'ann@gmail.com',
        age: '21',
        estado: 'Activo'
    },
    {
        id: 7,
        firstName: 'Barbara',
        contrasena: 'Black',
        username: '@barbara',
        email: 'barbara@yandex.ru',
        age: '43',
        estado: 'Activo'
    },
    {
        id: 8,
        firstName: 'Sevan',
        contrasena: 'Bagrat',
        username: '@sevan',
        email: 'sevan@outlook.com',
        age: '13',
        estado: 'Activo'
    },
    {
        id: 9,
        firstName: 'Ruben',
        contrasena: 'Vardan',
        username: '@ruben',
        email: 'ruben@gmail.com',
        age: '22',
        estado: 'Activo'
    },
    {
        id: 10,
        firstName: 'Karen',
        contrasena: 'Sevan',
        username: '@karen',
        email: 'karen@yandex.ru',
        age: '33',
        estado: 'Activo'
    },
    {
        id: 11,
        firstName: 'Mark',
        contrasena: 'Otto',
        username: '@mark',
        email: 'mark@gmail.com',
        age: '38',
        estado: 'Activo'
    },
    {
        id: 12,
        firstName: 'Jacob',
        contrasena: 'Thornton',
        username: '@jacob',
        email: 'jacob@yandex.ru',
        age: '48',
        estado: 'Activo'
    },
    {
        id: 13,
        firstName: 'Haik',
        contrasena: 'Hakob',
        username: '@haik',
        email: 'haik@outlook.com',
        age: '48',
        estado: 'Activo'
    },
    {
        id: 14,
        firstName: 'Garegin',
        contrasena: 'Jirair',
        username: '@garegin',
        email: 'garegin@gmail.com',
        age: '40',
        estado: 'Activo'
    },
    {
        id: 15,
        firstName: 'Krikor',
        contrasena: 'Bedros',
        username: '@krikor',
        email: 'krikor@yandex.ru',
        age: '32',
        estado: 'Activo'
    }
];*/









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
