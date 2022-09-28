import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { CargarScriptsService } from './../../cargar-scripts.service';

@Component({
  selector: 'digitalizador',
  templateUrl: './digitalizador.component.html',
  styleUrls: ['./digitalizador.component.scss']
})




export class DigitalizadorComponent implements OnInit {
  constructor(private _CargarScripts: CargarScriptsService) {
    _CargarScripts.Carga(["digitalizador"]);
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
    fetch('http://127.0.0.1:3000/estacion')
      .then(texto => texto.json())
      .then(datos => {
        for (let estacion of datos) {
          formEstacion.innerHTML += '<option>' + estacion[0] + '</option>';
        }
      });

    var formpluviograma = document.getElementById("FormModelo");
    fetch('http://127.0.0.1:3000/modeloPluviogramas')
      .then(texto => texto.json())
      .then(datos => {
        for (let pluviograma of datos) {
          formpluviograma.innerHTML += '<option>' + pluviograma[0] + '</option>';
        }
      });

    var Inicio = document.getElementById("inicio");
    var Fin = document.getElementById("fin");


    if (Inicio == Fin) {
      alert("La fecha inicio es igual a la fecha fin");
    } else if ( Fin > Inicio) {
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