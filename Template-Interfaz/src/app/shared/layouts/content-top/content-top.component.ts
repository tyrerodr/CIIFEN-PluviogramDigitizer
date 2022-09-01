import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';


@Component({
  
  selector: 'content-top',
  templateUrl: './content-top.component.html',
  styleUrls: ['./content-top.component.scss']
})
export class ContentTopComponent implements OnInit {
  @Input() name: string;

  routeTitle;
  link;
  constructor(public _globalService: GlobalService) {
    this.getRouteTitle();
    }

  ngOnInit(): void {
  
  }
  
  private getRouteTitle() {
    /* this._globalService.isActived$.subscribe(isActived => {
      this.routeTitle = isActived.title;
    }, error => {
      console.log('Error: ' + error);
    }); */


    
    this._globalService.data$.subscribe(data => {
      console.log("entra")
      if (data.ev === 'isActived') {
        this.routeTitle = data.value.title;}
      // }else if(document.getElementById("tituloLink") != null){
      //   console.log("HOLAAA")
      //   var link = document.getElementById("tituloLink");
      //   var pathname = window.location.pathname;
      //   var id = pathname.split("/").pop(); 
      //   link.innerHTML= id;
      // }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  returnHome() {
    //    this._globalService._isActived({ title: 'Dashboard' });
    this._globalService.dataBusChanged('isActived', { title: 'Inicio' });
  }
}
