var contenedor= document.getElementById("contenedor_modal");


function abrirpopup(boton){
    
    indice=boton.id;
    ind1= indice+".1";
    ind2= indice+".2";
    ind3= indice+".3";
    ind4= indice+".4";
    ind5= indice+".5";
    nombre= document.getElementById(ind1);
    usuario=document.getElementById(ind2);
    email=document.getElementById(ind3);
    contraseña=document.getElementById(ind4);
    estado=document.getElementById(ind5);
    contenedor.innerHTML='<form class="form">'+
    '<h2>Modificar</h2>'+
    '<p type="Name:"><input placeholder="'+nombre.textContent+'"></input></p>'+
    '<p type="Email:"><input placeholder="'+email.textContent+'"></input></p>'+
    '<p type="usuario:"><input placeholder="'+usuario.textContent+'"></input></p>'+
    '<p type="contraseña:"><input placeholder="'+contraseña.textContent+'"></input></p>'+
    '<p type="estado:"><input placeholder="'+estado.textContent+'"></input></p>'+
    '</div>'+
  '</form>'
}

//''+nombre.textContent+'\n'+usuario.textContent+'\n'+email.textContent+'\n'+contraseña.textContent+'\n'+estado.textContent
