var contenedor = document.getElementById("TopEstacion");

function buscarxEstacion(boton) {
    indice = boton.id;
    window.location = "/pages/database/station/" + indice
    console.log(indice)
}

window.addEventListener('load', function() {
    console.log("cargando")
    var pathname = window.location.pathname;
    console.log(pathname)
    var id = pathname.split("/").pop(); 
    fetch('http://127.0.0.1:3000/estacion/' + id)
        .then(texto => texto.json())
        .then(datos => {
            datos = datos[0]
            console.log(datos[0][1])
            contenedor.innerHTML += '<div class = "row justify-content-md-center title"><h1 class="pb-3">Información de la Estación : '+ datos[1]+'</h1></div>' +
                '<div class= "row justify-content-md-center col1"> ' +
                '<div class="col col-md-auto"> <h5 class="h4 pb-2" >Estación: '+ datos[0]+'</h5></div>' +
                '<div class="col col-md-auto"> <h5 class="h4 pb-2">Altitud: '+ datos[2]+'</h5></div></div>' +
                '<div class= "row justify-content-md-center col2">  ' +
                '<div class="col col-md-auto"> <h5 class="h4 pb-4">Latitud: '+ datos[3]+'</h5></div>' +
                '<div class="col col-md-auto"> <h5 class="h4 pb-4">Longitud: '+ datos[4]+'</h5></div>' +
                '</div>'
        })
});




function buscarxPluviograma(boton) {
    indice = boton.id;
    window.location = "/pages/database/station/pluviograma/" + indice
    console.log(indice)
}