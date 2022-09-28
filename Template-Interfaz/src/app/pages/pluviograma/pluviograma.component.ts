import { Component, Injectable, OnInit } from '@angular/core';
// import { ChartsService } from '../charts/components/echarts/charts.service';
import { CargarScriptsService } from '../../cargar-scripts.service';
import * as $ from "jquery";


import * as Highcharts from 'highcharts';
import * as cdata from './data';
declare var require: any;

const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);


@Component({
  selector: 'app-pluviograma',
  templateUrl: './pluviograma.component.html',
  styleUrls: ['./pluviograma.component.scss'],
  // providers: [ChartsService]
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
  
  public data= cdata.TimeChartData;
 public options: any = {
    chart: {
       zoomType: 'x'
    },
    title: {
        text: 'USD to EUR exchange rate over time'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
            'Drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Exchange rate'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
    series: [{
                type: 'area',
                name: 'USD to EUR',
                data: this.data
            }]
  }
  
  constructor(private _CargarScripts:CargarScriptsService) 
  {
    _CargarScripts.Carga(["tablas","pluviograma"]);
    // this.LineOption = this._chartsService.getLineOption();
  }  

   
  ngOnInit() {
    this.loadData();
    Highcharts.chart('container', this.options);
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

