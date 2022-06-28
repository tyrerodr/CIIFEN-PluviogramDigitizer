import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from './../../cargar-scripts.service';

@Component({
  selector: 'digitalizador',
  templateUrl: './digitalizador.component.html',
  styleUrls: ['./digitalizador.component.scss']
})

export class DigitalizadorComponent implements OnInit {
  constructor(private _CargarScripts:CargarScriptsService) 
  {
    _CargarScripts.Carga(["digitalizador"]);
  }  

  ngOnInit() {
  
  }


}