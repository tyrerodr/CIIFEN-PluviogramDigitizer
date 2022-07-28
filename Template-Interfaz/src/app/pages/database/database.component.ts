import { Component, OnInit } from '@angular/core';
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
        ciudad: 'Valle del Chota',
        provincia: 'Imbabura',
        pais: 'Ecuador'
    },
    {
        id: 2,
        codigo: 'H0347',
        name: 'Estación Quevedo',
        ciudad: 'Quevedo',
        provincia: 'Los Ríos',
        pais: 'Ecuador'
    },
    {
        id: 3,
        codigo: 'M0008',
        name: 'Estación Puyo',
        ciudad: 'Puyo',
        provincia: 'Pastaza',
        pais: 'Ecuador'
    },
    {
        id: 4,
        codigo: 'M0485',
        name: 'Estación Carlos Julio Arosemena Tola',
        ciudad: 'Arosemena Tola',
        provincia: 'Tena',
        pais: 'Ecuador'
    },
    {
        id: 5,
        codigo: 'M1271',
        name: 'Estación Guayaquil (Falcultad CCNN)',
        ciudad: 'Guayaquil',
        provincia: 'Guayas',
        pais: 'Ecuador'
    },
    {
        id: 6,
        codigo: 'M1207',
        name: 'Estación Nobol',
        ciudad: 'Nobol',
        provincia: 'Guayas',
        pais: 'Ecuador'
    },
    {
        id: 7,
		codigo: 'M1170',
        name: 'Estación Santa Elena',
        ciudad: 'Santa Elena',
        provincia: 'Santa Elena',
        pais: 'Ecuador'
    },
    {
        id: 8,
        codigo: 'M1036',
        name: 'Estación Riobamba Politecnica',
        ciudad: 'Riobamba',
        provincia: 'Chimborazo',
        pais: 'Ecuador'
    },
    {
        id: 9,
        codigo: 'M0176',
        name: 'Estación Naranjal',
        ciudad: 'Naranjal',
        provincia: 'Guayas',
        pais: 'Ecuador'
    },
    {
        id: 10,
        codigo: 'M5138',
        name: 'Estación Jubal-INER',
        ciudad: 'Juval',
        provincia: 'Chimborazo',
        pais: 'Ecuador'
    },
    {
        id: 11,
		codigo: 'M1036',
        name: 'Estación Riobamba Politecnica',
        ciudad: 'Riobamba',
        provincia: 'Chimborazo',
        pais: 'Ecuador'
    },
    {
        id: 12,
        codigo: 'M1221',
        name: 'Estación San Jose de Payamino',
        ciudad: 'Loreto',
        provincia: 'Orellana',
        pais: 'Ecuador'
    },
    {
        id: 13,
		codigo: 'M1096',
        name: 'Estación Guayaquil U. Estatal',
        ciudad: 'Guayaquil',
        provincia: 'Guayas',
        pais: 'Ecuador'
    },
    {
        id: 14,
        codigo: 'M0292',
        name: 'Estación Machala Granja Sta.Ines',
        ciudad: 'Machala',
        provincia: 'El Oro',
        pais: 'Ecuador'
    },
    {
        id: 15,
        codigo: 'M0031',
        name: 'Estación Cañar',
        ciudad: 'Cañar',
        provincia: 'Cañar',
        pais: 'Ecuador'
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

}
