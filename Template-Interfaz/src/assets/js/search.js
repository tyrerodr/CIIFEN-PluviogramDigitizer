var contenedor = document.getElementById("TopEstacion");

function searchxStation(button) {
    index = button.id;
    window.location = "/pages/database/station/" + index
}

function searchxPluviogram(button) {
    index = button.id;
    window.location = "/pages/database/station/pluviogram/" + index
}


window.addEventListener('load', function() {
    var pathname = window.location.pathname;
    var id = pathname.split("/").pop(); 
    fetch('http://127.0.0.1:3000/station/' + id)
        .then(text => text.json())
        .then(data => {
            data = data[0]
            console.log(data[0][1])
            contenedor.innerHTML += '<div class = "row justify-content-md-center title"><h1 class="pb-3">Informacion de la Estación : '+ data[1]+'</h1></div>' +
                '<div class= "row justify-content-md-center col1"> ' +
                '<div class="col col-md-auto"> <h5 class="h4 pb-2" >Estación: '+ data[0]+'</h5></div>' +
                '<div class="col col-md-auto"> <h5 class="h4 pb-2">Altitud: '+ data[2]+'</h5></div></div>' +
                '<div class= "row justify-content-md-center col2">  ' +
                '<div class="col col-md-auto"> <h5 class="h4 pb-4">Latitud: '+ data[3]+'</h5></div>' +
                '<div class="col col-md-auto"> <h5 class="h4 pb-4">Longitud: '+ data[4]+'</h5></div>' +
                '</div>'
        })
});
