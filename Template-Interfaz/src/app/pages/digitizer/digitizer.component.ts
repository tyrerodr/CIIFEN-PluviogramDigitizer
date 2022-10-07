import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { UploadScriptsService } from '../../upload-scripts.service';
import * as $ from "jquery";

@Component({
  selector: 'digitizer',
  templateUrl: './digitizer.component.html',
  styleUrls: ['./digitizer.component.scss']
})




export class DigitizerComponent implements OnInit {
  constructor(private _UploadScripts: UploadScriptsService) {
    _UploadScripts.upload(["digitizer"]);
  }

  ngOnInit() {
    var todayDate = new Date().toISOString().slice(0, 10);
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    var fechaInicio = document.getElementById("fechainicioactual");
    fechaInicio.innerHTML += '<h4 id = "FormFechaInicio" class="text-left">Fecha Inicio:</h4>' +
      '<input type="date" id="inicio" name="trip-start" value="' + yesterday.toISOString().slice(0, 10) + '" max="' + todayDate + '" class="form-control"> '

    var fechaFinal = document.getElementById("fechainiciofin");
    fechaFinal.innerHTML += '<h4 id = "FormFechaFin" class="text-left">Fecha Fin:</h4>' +
      '<input type="date" id="fin" name="trip-start" value="' + todayDate + '" max="' + todayDate + '" class="form-control">'
    this.loadData();
  }


  loadData() {
    var formEstacion = document.getElementById("FormEstacion");
    fetch('http://127.0.0.1:3000/stations')
      .then(text => text.json())
      .then(data => {
        for (let station of data) {
          formEstacion.innerHTML += '<option>' + station[0] + '</option>';
        }
      });

    var formpluviograma = document.getElementById("FormModelo");
    fetch('http://127.0.0.1:3000/modelPluviograms')
      .then(text => text.json())
      .then(data => {
        for (let pluviogram of data) {
          formpluviograma.innerHTML += '<option>' + pluviogram[0] + '</option>';
        }
      });

    var start = document.getElementById("inicio");
    var end = document.getElementById("fin");


    if (start == end) {
      alert("La fecha inicio es igual a la fecha fin");
    } else if ( end > start) {
      alert("La fecha fin es mayor a la fecha inicio");
    } 
  }


  alertConfirm() {
    swal({
      title: '¿Está seguro de que quiere digitalizar?',
      text: 'No podrá revertir los cambios después de digitalizar.',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f436b',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Digitalizar'
    }).then((result) => {
      if (result.value) {
        this.alertTimer()
      }
    });
  }

  alertTimer() {
    swal({
      title: 'Digitalizando la Banda',
      text: 'Espere hasta que termine la digitalización.',
      onOpen: () => {
        swal.showLoading();
        $("#btn-digitalizador").click();
      }
    })
  }



}