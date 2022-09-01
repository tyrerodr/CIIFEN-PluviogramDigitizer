var contenedor= document.getElementById("contenedor_modal");

function buscarEstacion(boton){
    indice=boton.id;
    window.location="/pages/database/station/" + indice
    console.log(indice)
}