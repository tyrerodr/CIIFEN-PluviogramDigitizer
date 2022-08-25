

var contenedor= document.getElementById("contenedor_modal");

var idviejo;

function abrirpopup(boton){
    
    indice=boton.id;
    ind4=indice+".4";
    ind1= indice+".1";
    ind2= indice+".2";
    ind3= indice+".3";
    ind5= indice+".5";
    nombre= document.getElementById(ind1);
    usuario=document.getElementById(ind2);
    email=document.getElementById(ind3);
    id=document.getElementById(ind4);
    idviejo=id.textContent;
    estado=document.getElementById(ind5);
    contenedor.innerHTML='<form class="form">'+
    '<h2>Modificar</h2>'+
    '<p type="ID:"><input id = id placeholder="'+id.textContent+'"></input></p>'+
    '<p type="Name:"><input id = name placeholder="'+nombre.textContent+'"></input></p>'+
    '<p type="Email:"><input id=email placeholder="'+email.textContent+'"></input></p>'+
    '<p type="usuario:"><input id=usuario placeholder="'+usuario.textContent+'"></input></p>'+
    '<p type="contraseña:"><input id=contraseña placeholder="contraseña"></input></p>'+
    '<p type="estado:"><input id=estado placeholder="'+estado.textContent+'"></input></p>'+
    '</div>'+
  '</form>'
}

function guardar(){
  

  nombreModificar= ""
  emailModificar=""
  usuarioModificar=""
  contraseñaModificar=""
  estadoModificar=""

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
    
    console.log("idi")
    console.log(idi)
    
    var dic= {id:idi,nombre:nombreModificar,email:emailModificar,usuario:usuarioModificar,contraseña:contraseñaModificar,estado:estadoModificar}
    
    fetch('http://127.0.0.1:3000/users/update/'+idi, {
      method: 'POST', body: JSON.stringify({idviejo: idviejo,id:idi,nombre:nombreModificar,email:emailModificar,usuario:usuarioModificar,contraseña:contraseñaModificar,estado:estadoModificar}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}}).then(function (response) {
        if (response.ok) { 
          window.location.reload();
          return response.json();}
        return Promise.reject(response);}).then(function (data) {
        console.log(data);}).catch(function (error) {console.warn('Something went wrong.', error);});
    
    //modificar(id,nombreModificar,emailModificar,usuarioModificar,contraseñaModificar,estadoModificar)

    /*conexion1 = psycopg2.connect(database="", user="", password="s", host="",port="")
    cursor1 = conexion1.cursor()
    cursor1.execute('UPDATE tabla SET idusers='+id+',nombre='+ nombreModificar+',correo='+emailModificar+',usario='+usuarioModificar+',contrasena='+contraseñaModificar+',estado='+estadoModificar+'where idusers='+id*/
  } 

}




