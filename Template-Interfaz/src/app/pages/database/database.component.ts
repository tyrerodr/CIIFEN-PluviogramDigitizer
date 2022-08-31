import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectComponent } from 'ng2-select';
import { CargarScriptsService } from './../../cargar-scripts.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {
  tableData: Array<any>;
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;
  x:{
    id: number,
    nombre: string,
    altitud: string,
    latitud: string,
    longitud: string,
    usuariocreador: string,
    estado: string
    };

    DATA: Array<{
        id: number,
        nombre: string,
        altitud: string,
        latitud: string,
        longitud: string,
        usuariocreador: string,
        estado: string
    }>=[]; 
  constructor(private _CargarScripts:CargarScriptsService, private router: Router) 
  {
    _CargarScripts.Carga(["tablas","buscar"]);
  }  

  
  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
     
    fetch('http://127.0.0.1:3000/estacion')
  .then(texto => texto.json())
  .then(datos => {
      for (let estacion of datos) {
          this.x={
            id: estacion[0],
            nombre: estacion[1],
            altitud: estacion[2],
            latitud: estacion[3],
            longitud: estacion[4],
            usuariocreador: estacion[5],
            estado: estacion[6]
          };
          this.DATA.push(this.x);
      }
  
      
    this.tableData = this.DATA;
  })}

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  navegate(){
    window.location.href = 'http://localhost:4200/pages/database/station';
    console.log("Entra")
  }
}

