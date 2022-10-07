import { Component, OnInit } from '@angular/core';
import { UploadScriptsService } from '../../upload-scripts.service';

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
    pluviogram:{
        id: string,
        dateDigitizing: string,
        model: string,
        };
    
        DATA: Array<{
          id: string,
          dateDigitizing: string,
          model: string,
        }>=[]; 


  constructor(private _UploadScripts:UploadScriptsService) 
  {
    _UploadScripts.upload(["tables","search"]);
  }  
  
  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    var pathname = window.location.pathname;
    var id = pathname.split("/").pop(); 
    fetch('http://127.0.0.1:3000//station/pluviogram/' + id)
    .then(texto => texto.json())
    .then(datos => {
      for (let onePluviogram of datos) {
          this.pluviogram={
            id: onePluviogram[0],
            dateDigitizing: onePluviogram[4],
            model: onePluviogram[5],
          };
          this.DATA.push(this.pluviogram);
      }
  
      
    this.tableData = this.DATA;
  })}
  
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
  navegate(){
    window.location.href = 'http://localhost:4200/pages/database/station';
  }
}
