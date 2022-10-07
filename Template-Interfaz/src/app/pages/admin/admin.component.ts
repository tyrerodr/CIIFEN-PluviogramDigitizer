import { Component, OnInit } from '@angular/core';
import { UploadScriptsService } from '../../upload-scripts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  tableData: Array<any>;
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;
  
  user:{
    id: number,
    firstName: string,
    password: string,
    username: string,
    email: string,
    status: string,
    type: string
};


DATA: Array<{
    id: number,
    firstName: string,
    password: string,
    username: string,
    email: string,

    status: string,
    type: string
}>=[]; 


constructor(private _UploadScripts:UploadScriptsService) 
{
  _UploadScripts.upload(["tables","update"]);
}  


ngOnInit() {
  this.loadData();
}

loadData() {
   
    fetch('http://127.0.0.1:3000/users')
.then(text => text.json())
.then(data => {
    for (let users of data) {
        if(users[6] == '1'){
            users[6] = 'activo'
        }else{
            users[6] = 'inactivo'
        }
        this.user={
            id: users[0],
            firstName: users[4],
            password: users[3],
            username: users[1],
            email: users[2],            
            status: users[6],
            type: users[5]
        };
        this.DATA.push(this.user);
    }

    
  this.tableData = this.DATA;
})}

pageChanged(pN: number): void {
  this.pageNumber = pN;
}




}
