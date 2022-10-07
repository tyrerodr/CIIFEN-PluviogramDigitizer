import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadScriptsService } from '../../upload-scripts.service';

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
  station:{
    id: number,
    name: string,
    altitude: string,
    latitude: string,
    longitude: string,
    createUser: string,
    status: string
    };

    DATA: Array<{
        id: number,
        name: string,
        altitude: string,
        latitude: string,
        longitude: string,
        createUser: string,
        status: string
    }>=[]; 
  constructor(private _UploadScripts:UploadScriptsService, private router: Router) 
  {
    _UploadScripts.upload(["tables","search"]);
  }  

  
  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    fetch('http://127.0.0.1:3000/stations')
  .then(text => text.json())
  .then(data => {
      for (let station of data) {
          this.station={
            id: station[0],
            name: station[1],
            altitude: station[2],
            latitude: station[3],
            longitude: station[4],
            createUser: station[5],
            status: station[6]
          };
          this.DATA.push(this.station);
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

