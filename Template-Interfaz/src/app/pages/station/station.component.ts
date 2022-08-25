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
    DATA = [
      {
          id: 1,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 2,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 3,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 4,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 5,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 6,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 7,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 8,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 9,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 10,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 11,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 12,
          codigo: 'AZE2001',
          fecha: '01/01/2007',
          modelo: 'Modelo1'
      },
      {
          id: 13,
          codigo: 'AZE2001',
          fecha: '01/01/01',
          modelo: 'Modelo1'
      },
      {
          id: 14,
          codigo: 'AZE2001',
          fecha: '01/01/01',
          modelo: 'Modelo1'
      },
      {
          id: 15,
          codigo: 'AZE2001',
          fecha: '01/01/01',
          modelo: 'Modelo1'
      }
  ];
  constructor(private _CargarScripts:CargarScriptsService) 
  {
    _CargarScripts.Carga(["tablas"]);
  }  
  
  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    this.tableData = this.DATA;
  }
  
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
  navegate(){
    window.location.href = 'http://localhost:4200/pages/database/station';
    console.log("Entra")
  }
}
