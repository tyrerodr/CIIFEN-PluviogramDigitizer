

var contenedor= document.getElementById("contenedor_modal");

var idviejo;

function abrirpopup(boton){
    
    indice=boton.id;
    ind4=indice+".4";
    ind1= indice+".1";
    ind2= indice+".2";
    ind3= indice+".3";
    ind5= indice+".5";
    ind6= indice+".6";
    nombre= document.getElementById(ind1);
    usuario=document.getElementById(ind2);
    email=document.getElementById(ind3);
    id=document.getElementById(ind4);
    idviejo=id.textContent;
    estado=document.getElementById(ind5);
    tipo=document.getElementById(ind6);
    contenedor.innerHTML='<form class="form">'+
    // '<h2>Modificar</h2>'+
    // <input class="form-control with-success-addon" placeholder="Mail" type="text"></input>
    '<p>Id:</p>'+
    '<p type="ID:"><input class="form-control with-primary-addon" id = id value="'+id.textContent+'"></input></p>'+
    '<p>Nombre:</p>'+
    '<p type="Name:"><input class="form-control with-primary-addon" id = name value="'+nombre.textContent+'"></input></p>'+
    '<p>Email:</p>'+
    '<p type="Email:"><input class="form-control with-primary-addon" id=email value="'+email.textContent+'"></input></p>'+
    '<p>Usuario:</p>'+
    '<p type="usuario:"><input class="form-control with-primary-addon" id=usuario value="'+usuario.textContent+'"></input></p>'+
    '<p>Contraseña:</p>'+
    '<p type="contraseña:"><input class="form-control with-primary-addon" id=contraseña value="contraseña"></input></p>'+
    '<p>Estado:</p>'+
    '<p type="estado:"><input class="form-control with-primary-addon" id=estado value="'+estado.textContent+'"></input></p>'+
    '<p>Tipo de usuario:</p>'+
    '<p type="estado:"><input class="form-control with-primary-addon" id=tipo value="'+tipo.textContent+'"></input></p>'+
    '</div>'+
  '</form>'
}

function guardar(){
  

  nombreModificar= ""
  emailModificar=""
  usuarioModificar=""
  contraseñaModificar=""
  estadoModificar=""
  tipoMod=""

  if((document.getElementById("id").value)=="" || (document.getElementById("name").value)=="" || (document.getElementById("email").value)=="" || (document.getElementById("usuario").value)=="" || (document.getElementById("contraseña").value)=="" || (document.getElementById("estado").value)==""){
    console.log("llene todo los datos")
  }
  else{
    nombreModificar= document.getElementById("name").value
    emailModificar= document.getElementById("email").value
    usuarioModificar= document.getElementById("usuario").value
    contraseñaModificar= document.getElementById("contraseña").value
    estadoModificar= document.getElementById("estado").value
    idi=document.getElementById("id").value
    tipoMod=document.getElementById("tipo").value
    console.log("idi")
    console.log(idi)
    
    var dic= {id:idi,nombre:nombreModificar,email:emailModificar,usuario:usuarioModificar,contraseña:contraseñaModificar,estado:estadoModificar}
    
    fetch('http://127.0.0.1:3000/users/update/'+idi, {
      method: 'POST', body: JSON.stringify({idviejo: idviejo,id:idi,nombre:nombreModificar,email:emailModificar,usuario:usuarioModificar,contraseña:contraseñaModificar,estado:estadoModificar,tipo:tipoMod}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}}).then(function (response) {
        if (response.ok) { 
          window.location.reload();
          return response.json();}
        return Promise.reject(response);}).then(function (data) {
        console.log(data);}).catch(function (error) {console.warn('Something went wrong.', error);});
  } 

}
function eliminar(){
  idi=idviejo
  fetch('http://127.0.0.1:3000/users/eliminar', {
      method: 'POST', body: JSON.stringify({id: idi}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}}).then(function (response) {
        if (response.ok) { 
          window.location.reload();
          return response.json();}
        return Promise.reject(response);}).then(function (data) {
        console.log(data);}).catch(function (error) {console.warn('Something went wrong.', error);});


}

function ventanaAñadir(){
  ventanaAñadir= document.getElementById("cont_añadir_usuarios")
  ventanaAñadir.innerHTML='<form class="form">'+
    //'<h2>Modificar</h2>'+
    '<p>Id:</p>'+
    '<p type="ID:"><input class="form-control with-primary-addon" id = idA></input></p>'+
    '<p>Nombre:</p>'+
    '<p type="Name:"><input class="form-control with-primary-addon" id = nameA ></input></p>'+
    '<p>Email:</p>'+
    '<p type="Email:"><input class="form-control with-primary-addon" id=emailA ></input></p>'+
    '<p>Usuario:</p>'+
    '<p type="usuario:"><input class="form-control with-primary-addon" id=usuarioA ></input></p>'+
    '<p>Contraseña:</p>'+
    '<p type="contraseña:"><input class="form-control with-primary-addon" id=contraseñaA ></input></p>'+
    '<p>Estado:</p>'+
    '<p type="estado:"><input class="form-control with-primary-addon" id=estadoA></input></p>'+
    '<p>Tipo de usuario:</p>'+
    '<p type="estado:"><input class="form-control with-primary-addon" id=tipoA></input></p>'+
    '</div>'+
  '</form>'

}
function añadir(){
  

  nombreModificar= ""
  emailModificar=""
  usuarioModificar=""
  contraseñaModificar=""
  estadoModificar=""
  tipoModificar=""

  if((document.getElementById("idA").value)=="" || (document.getElementById("nameA").value)=="" || (document.getElementById("emailA").value)=="" || (document.getElementById("usuarioA").value)=="" || (document.getElementById("contraseñaA").value)=="" || (document.getElementById("estadoA").value)==""){
    console.log("llene todo los datos")
  }
  else{
    nombreModificar= document.getElementById("nameA").value
    emailModificar= document.getElementById("emailA").value
    usuarioModificar= document.getElementById("usuarioA").value
    contraseñaModificar= document.getElementById("contraseñaA").value
    estadoModificar= document.getElementById("estadoA").value
    idi=document.getElementById("idA").value
    tipoModificar=document.getElementById("tipoA").value

    console.log("idi")
    console.log(idi)
    
    var dic= {id:idi,nombre:nombreModificar,email:emailModificar,usuario:usuarioModificar,contraseña:contraseñaModificar,estado:estadoModificar,tipo:tipoModificar}
    
    fetch('http://127.0.0.1:3000/users/añadir', {
      method: 'POST', body: JSON.stringify({id:idi,nombre:nombreModificar,email:emailModificar,usuario:usuarioModificar,contraseña:contraseñaModificar,estado:estadoModificar,tipo: tipoModificar}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}}).then(function (response) {
        if (response.ok) { 
          window.location.reload();
          return response.json();}
        return Promise.reject(response);}).then(function (data) {
        console.log(data);}).catch(function (error) {console.warn('Something went wrong.', error);});
    
    } 

}
  
  





