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
    minutos:{
      hora: string,
      precipitacion: string,
      };
    DATA: Array<{
      hora: string,
      precipitacion: string,
    }>=[]; 
  
  showloading: boolean = false;
  LineOption;
  AnimationBarOption;

  constructor(private _CargarScripts:CargarScriptsService,private _chartsService: ChartsService) 
  {
    _CargarScripts.Carga(["tablas","pluviograma"]);
    this.LineOption = this._chartsService.getLineOption();
  }  

   

  
  ngOnInit() {
    this.loadData();
    this.AnimationBarOption = this._chartsService.getAnimationBarOption();
  }
  
  loadData() {
    this.tableData = this.DATA;
    var pathname = window.location.pathname;
    var id = pathname.split("/").pop(); 
    fetch('http://127.0.0.1:3000/pluviogramaSeriedetiempo/' + id)
    .then(texto => texto.json())
    .then(datos => {
    for (let dic of datos["minutes"]) {
      // console.log(dic['hora'])
      let p = dic['precipitacion'].toFixed(5)
      this.minutos={
        hora: dic['hora'],
        precipitacion: p.toString() ,
      };
      this.DATA.push(this.minutos);
    }});
  
  }
  
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
   




}

