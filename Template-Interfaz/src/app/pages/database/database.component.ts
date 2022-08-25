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
  DATA = [
    {
        id: 1,
        codigo: 'H0015',
        name: 'Estación Chota',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 2,
        codigo: 'H0347',
        name: 'Estación Quevedo',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 3,
        codigo: 'M0008',
        name: 'Estación Puyo',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 4,
        codigo: 'M0485',
        name: 'Estación Carlos Julio Arosemena Tola',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 5,
        codigo: 'M1271',
        name: 'Estación Guayaquil (Falcultad CCNN)',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 6,
        codigo: 'M1207',
        name: 'Estación Nobol',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 7,
		codigo: 'M1170',
        name: 'Estación Santa Elena',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 8,
        codigo: 'M1036',
        name: 'Estación Riobamba Politecnica',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 9,
        codigo: 'M0176',
        name: 'Estación Naranjal',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 10,
        codigo: 'M5138',
        name: 'Estación Jubal-INER',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 11,
		codigo: 'M1036',
        name: 'Estación Riobamba Politecnica',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 12,
        codigo: 'M1221',
        name: 'Estación San Jose de Payamino',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 13,
		codigo: 'M1096',
        name: 'Estación Guayaquil U. Estatal',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 14,
        codigo: 'M0292',
        name: 'Estación Machala Granja Sta.Ines',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    },
    {
        id: 15,
        codigo: 'M0031',
        name: 'Estación Cañar',
        altitud: '-20.10056',
        latitud: '-20.10056',
        longitud: '-20.10056'
    }
];
  constructor(private _CargarScripts:CargarScriptsService, private router: Router) 
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

