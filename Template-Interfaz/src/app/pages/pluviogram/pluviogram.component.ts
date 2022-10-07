import { Component, Injectable, OnInit } from '@angular/core';
// import { ChartsService } from '../charts/components/echarts/charts.service';
import { UploadScriptsService } from '../../upload-scripts.service';

// import * as Highcharts from 'highcharts';
declare var require: any;

// const More = require('highcharts/highcharts-more');
// More(Highcharts);

// const Exporting = require('highcharts/modules/exporting');
// Exporting(Highcharts);

// const ExportData = require('highcharts/modules/export-data');
// ExportData(Highcharts);

// const Accessibility = require('highcharts/modules/accessibility');
// Accessibility(Highcharts);


@Component({
  selector: 'app-pluviograma',
  templateUrl: './pluviogram.component.html',
  styleUrls: ['./pluviogram.component.scss'],
  // providers: [ChartsService]
})

@Injectable()
export class PluviogramComponent implements OnInit {
  plotPng: string = '../../../../assets/images/plot.png';
  acumulatedPng: string = '../../../../assets/images/acumulatedPlot.png';
  bandPng: string = '../../../../assets/images/img.png';
  tableData: Array<any>;
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;
  minutes: {
    hour: string,
    precipitation: string,
  };
  DATA: Array<{
    hour: string,
    precipitation: string,
  }> = [];

  showloading: boolean = false;

  data: Array<any> = [];
  // public data = cdata.TimeChartDa; 


  // public options: any = {
  //   chart: {
  //     zoomType: 'x'
  //   },
  //   title: {
  //     text: 'Precipitación Acumulada'
  //   },
  //   subtitle: {
  //     text: document.ontouchstart === undefined ?
  //       'Drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
  //   },
  //   xAxis: {
  //     type: 'datetime'
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'Precipitación'
  //     }
  //   },
  //   legend: {
  //     enabled: false
  //   },
  //   plotOptions: {
  //     area: {
  //       fillColor: {
  //         linearGradient: {
  //           x1: 0,
  //           y1: 0,
  //           x2: 0,
  //           y2: 1
  //         },
  //         stops: [
  //           [0, Highcharts.getOptions().colors[0]],
  //           [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
  //         ]
  //       },
  //       marker: {
  //         radius: 2
  //       },
  //       lineWidth: 1,
  //       states: {
  //         hover: {
  //           lineWidth: 1
  //         }
  //       },
  //       threshold: null
  //     }
  //   },
  //   series: [{
  //     type: 'area',
  //     name: 'Precipitación Acumulada',
  //     data: this.data,
  //     turboThreshold: 5000
  //   }]
  // }

  constructor(private _UploadScripts: UploadScriptsService) {
    
    _UploadScripts.upload(["tables", "pluviogram"]);
    // this.LineOption = this._chartsService.getLineOption();
  }


  ngOnInit() {
    this.loadData();
    // Highcharts.chart('container', this.options);
  }
  grafico: [
    number,
    number
  ];

  dataGraph: Array<[
    number,
    number
  ]> = [];

  loadData() {
    this.tableData = this.DATA;
    var pathname = window.location.pathname;
    var id = pathname.split("/").pop();

    this.data.push([1328074904000, 0.14601769911504192])


    fetch('http://127.0.0.1:3000/pluviogramaSeriedetiempo/' + id)
      .then(text => text.json())
      .then(data => {
        for (let dic of data["minutes"]) {
          // console.log(dic['hour'])
          // console.log(dic)
          let p = dic['precipitacion'].toFixed(5)
          // const [dateComponents, timeComponents] = dic["hour"].split(' ');
          // const [year, month, day] = dateComponents.split('-');
          // const [hours, minutes, seconds] = timeComponents.split(':');
          // var hour = hours + ':' + minutes + ':' + seconds;
          this.minutes = {
            hour: dic["hora"],
            precipitation: p.toString(),
          };
          this.DATA.push(this.minutes);


          // this.grafico = [Date.UTC(parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds)), dic['precipitation']];
          // this.dataGraph.push(this.grafico)
          
        }

        // console.log(this.grafico);
        // for (let dic of datos["data"]) {
        //       const [dateComponents, timeComponents] = dic[1].split(' ');
        //       // console.log(dateComponents); // 👉️ "07/21/2024"
        //       // console.log(timeComponents); // 👉️ "04:24:37"
        //       const [year, month, day] = dateComponents.split('-');
        //       const [hours, minutes, seconds] = timeComponents.split(':');       
        //       this.grafico=[
        //         Date.UTC(parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds)),
        //         dic[0]
        //       ]   
        //       this.dataGraph.push(this.grafico)
        //       // console.log(arreglos)
        //     }

      });
    //   console.log(this.dataGraph)
    //   this.data = this.dataGraph
    //   console.log(this.data)
    //   if(this.dataGraph.length > 0){
    //   console.log(this.data.pop())
    // }
    //   const [dateComponents, timeComponents] = '2012-01-01 07:00:08'.split(' ');
    //   const [year, month, day] = dateComponents.split('-');
    //   const [hours, minutes, seconds] = timeComponents.split(':');
    //   var hour = hours + ':' + minutes+ ':' + seconds;

    //   this.data.push([Date.UTC(parseInt(year), parseInt(month), parseInt(day), 
    //     parseInt(hours), parseInt(minutes), parseInt(seconds)),0.7184549356223187])
  }


  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  

}

