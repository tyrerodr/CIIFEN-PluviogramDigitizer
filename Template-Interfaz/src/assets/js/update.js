

var container= document.getElementById("contenedor_modal");

var lastID;

function openPopUp(boton){
    
    index=boton.id;
    ind4=index+".4";
    ind1= index+".1";
    ind2= index+".2";
    ind3= index+".3";
    ind5= index+".5";
    ind6= index+".6";
    nameA= document.getElementById(ind1);
    user=document.getElementById(ind2);
    email=document.getElementById(ind3);
    id=document.getElementById(ind4);
    lastID=id.textContent;
    statusA=document.getElementById(ind5);
    type=document.getElementById(ind6);
    container.innerHTML='<form class="form">'+
    // '<h2>Modificar</h2>'+
    // <input class="form-control with-success-addon" placeholder="Mail" type="text"></input>
    '<p id ="idOcultar">Id:</p>'+
    '<p type="ID:"><input class="form-control with-primary-addon" id = id value="'+id.textContent+'"></input></p>'+
    '<p>Nombre:</p>'+
    '<p type="Name:"><input class="form-control with-primary-addon" id = name value="'+nameA.textContent+'"></input></p>'+
    '<p>Email:</p>'+
    '<p type="Email:"><input class="form-control with-primary-addon" id=email value="'+email.textContent+'"></input></p>'+
    '<p>Usuario:</p>'+
    '<p type="usuario:"><input class="form-control with-primary-addon" id=usuario value="'+user.textContent+'"></input></p>'+
    '<p>Contraseña:</p>'+
    '<p type="contraseña:"><input class="form-control with-primary-addon" id=contraseña value="*********"></input></p>'+
    '<p>Estado:</p>'+
    '<p type="estado:"><input class="form-control with-primary-addon" id=estado value="'+statusA.textContent+'"></input></p>'+
    '<p>Tipo de usuario:</p>'+
    '<p type="estado:"><input class="form-control with-primary-addon" id=tipo value="'+type.textContent+'"></input></p>'+
    '</div>'+
  '</form>'

  document.getElementById("id").style.display = 'none';
  document.getElementById("idOcultar").style.display = 'none';

}

function save(){
  modifyName= ""
  modifyEmail=""
  modifyUser=""
  modifyPassword=""
  modifyStatus=""
  modifyType=""

  if((document.getElementById("id").value)=="" || (document.getElementById("name").value)=="" || (document.getElementById("email").value)=="" || (document.getElementById("usuario").value)=="" || (document.getElementById("contraseña").value)=="" || (document.getElementById("estado").value)==""){
    swal({
      type: 'error',
      title: 'Llene todos los datos!',
      text: 'Campos sin llenar.',
      confirmButtonText:'Ok',
      confirmButtonColor: '#0f436b',
    });
  }
  else{
    modifyName= document.getElementById("name").value
    modifyEmail= document.getElementById("email").value
    modifyUser= document.getElementById("usuario").value
    modifyPassword= document.getElementById("contraseña").value
    modifyStatus= document.getElementById("estado").value
    idi=document.getElementById("id").value
    modifyType=document.getElementById("tipo").value
    
    var dic= {id:idi,name:modifyName,email:modifyEmail,user:modifyUser,password:modifyPassword,status:modifyStatus}
    
    fetch('http://127.0.0.1:3000/users/update/'+idi, {
      method: 'POST', body: JSON.stringify({lastID: lastID,id:idi,name:modifyName,email:modifyEmail,user:modifyUser,
        password:modifyPassword,status:modifyStatus,type:modifyType}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}}).then(function (response) {
        if (response.ok) { 
          window.location.reload();
          return response.json();}
        return Promise.reject(response);}).then(function (data) {
        console.log(data);}).catch(function (error) {console.warn('Something went wrong.', error);});
  } 

}
function deleteone(){
  idi=lastID
  fetch('http://127.0.0.1:3000/users/delete', {
      method: 'POST', body: JSON.stringify({id: idi}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}}).then(function (response) {
        if (response.ok) { 
          window.location.reload();
          return response.json();}
        return Promise.reject(response);}).then(function (data) {
        console.log(data);}).catch(function (error) {console.warn('Something went wrong.', error);});


}

function windowAdd(){
  windowAdd= document.getElementById("cont_añadir_usuarios")
  windowAdd.innerHTML='<form class="form">'+
    //'<h2>Modificar</h2>'+
    '<p>Nombre:</p>'+
    '<p type="Name:"><input class="form-control with-primary-addon" id =nameA ></input></p>'+
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
function add(){
  modifyName= ""
  modifyEmail=""
  modifyUser=""
  modifyPassword=""
  modifyStatus=""
  modifyTypeificar=""

  if((document.getElementById("nameA").value)=="" || (document.getElementById("emailA").value)=="" || (document.getElementById("usuarioA").value)=="" || (document.getElementById("contraseñaA").value)=="" || (document.getElementById("estadoA").value)==""){
    swal({
      type: 'error',
      title: 'Llene todos los datos!',
      text: 'Campos sin llenar.',
      confirmButtonText:'Ok',
      confirmButtonColor: '#0f436b',
    });
  }
  else{
    modifyName= document.getElementById("nameA").value
    modifyEmail= document.getElementById("emailA").value
    modifyUser= document.getElementById("usuarioA").value
    modifyPassword= document.getElementById("contraseñaA").value
    modifyStatus= document.getElementById("estadoA").value
    modifyTypeificar=document.getElementById("tipoA").value

    fetch('http://127.0.0.1:3000/users/add', {
      method: 'POST', body: JSON.stringify({name:modifyName,email:modifyEmail,user:modifyUser,
        password:modifyPassword,status:modifyStatus,type:modifyType}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}}).then(function (response) {
        if (response.ok) { 
          window.location.reload();
          return response.json();}
        return Promise.reject(response);}).then(function (data) {
        console.log(data);}).catch(function (error) {console.warn('Something went wrong.', error);});
    
    } 

}
  
  





