import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../cargar-scripts.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
    tableData: Array<any>;
    /* pagination Info */
    pageSize = 10;
    pageNumber = 1;
    pluviograma:{
        id: string,
        fecha_digitalizacion: string,
        modelo: string,
        };
    
        DATA: Array<{
          id: string,
          fecha_digitalizacion: string,
          modelo: string,
        }>=[]; 


  constructor(private _CargarScripts:CargarScriptsService) 
  {
    _CargarScripts.Carga(["tablas","buscar"]);
  }  
  
  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    var pathname = window.location.pathname;
    var id = pathname.split("/").pop(); 
    console.log("Pluvio"+id)
    fetch('http://127.0.0.1:3000//estacion/pluviograma/' + id)
    .then(texto => texto.json())
    .then(datos => {
      console.log(datos)
      for (let pluviogramas of datos) {
        console.log("Pluvio"+pluviogramas[4])
          this.pluviograma={
            id: pluviogramas[0],
            fecha_digitalizacion: pluviogramas[4],
            modelo: pluviogramas[5],
          };
          this.DATA.push(this.pluviograma);
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
