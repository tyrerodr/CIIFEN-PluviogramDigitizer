import { Component, Injectable, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';
import { CargarScriptsService } from '../../cargar-scripts.service';

@Component({
  selector: 'app-pluviograma',
  templateUrl: './pluviograma.component.html',
  styleUrls: ['./pluviograma.component.scss'],
  providers: [ChartsService]
})

@Injectable()
export class PluviogramaComponent implements OnInit {
  tableData: Array<any>;
    /* pagination Info */
    pageSize = 10;
    pageNumber = 1;
    DATA = [
      {
          id: 1,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 2,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 3,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 4,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 5,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 6,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 7,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 8,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 9,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 10,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 11,
          hora: '15:00',
          precipitacion: '1.00'
      },
      {
          id: 12,
          hora: '15:00',
          precipitacion: '1.00'
      }
  ];
  
  showloading: boolean = false;
  LineOption;
  AnimationBarOption;

  constructor(private _CargarScripts:CargarScriptsService,private _chartsService: ChartsService) 
  {
    _CargarScripts.Carga(["tablas"]);
    this.LineOption = this._chartsService.getLineOption();
  }  

   

  
  ngOnInit() {
    this.loadData();
    this.AnimationBarOption = this._chartsService.getAnimationBarOption();
  }
  
  loadData() {
    this.tableData = this.DATA;
  }
  
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
   

}

