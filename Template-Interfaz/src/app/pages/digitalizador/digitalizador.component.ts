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
    this.loadData();
  }


  loadData() {
    var formEstacion = document.getElementById("FormEstacion");
    fetch('http://127.0.0.1:3000/estacion')
    .then(texto => texto.json())
    .then(datos => {
    for (let estacion of datos) {
      formEstacion.innerHTML += '<option>'+estacion[0]+'</option>';
    }});
  
    var formpluviograma = document.getElementById("FormModelo");
    fetch('http://127.0.0.1:3000/modeloPluviogramas')
    .then(texto => texto.json())
    .then(datos => {
    for (let pluviograma of datos) {
      formpluviograma.innerHTML += '<option>'+pluviograma[0]+'</option>';
    }});

    //Formato MES/DIA/AÑO
    // var primera = Date.parse("10/01/2013"); //01 de Octubre del 2013
    // var segunda = Date.parse("10/03/2013"); //03 de Octubre del 2013
    
    // if (primera == segunda){
    //     alert("Primera es igual Segunda");
    // } else if (primera > segunda) {
    //     alert("Primera mayor que Segunda");
    // } else{
    //     alert("Segunda mayor que Primera");
    // }

  }

    

  
}