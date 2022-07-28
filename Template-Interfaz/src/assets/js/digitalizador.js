// Obtener referencia al input y a la imagen
  $seleccionArchivos = document.querySelector("#seleccionArchivos"),
  $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion"),
  $btnDigitalizar = document.querySelector("#btn-digitalizador");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "image/png");
// Escuchar cuando cambie
$seleccionArchivos.addEventListener("change", () => {
  // Los archivos seleccionados, pueden ser muchos o uno
  const archivos = $seleccionArchivos.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!archivos || !archivos.length) {
    $imagenPrevisualizacion.src = "";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  const primerArchivo = archivos[0];
  // Lo convertimos a un objeto de tipo objectURL
  const objectURL = URL.createObjectURL(primerArchivo);
  // Y a la fuente de la imagen le ponemos el objectURL
  $imagenPrevisualizacion.src = objectURL;
});

//escuchar cuando click
$btnDigitalizar.addEventListener("click", () => {
  const archivos = $seleccionArchivos.files;
  const primerArchivo = archivos[0];
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://127.0.0.1:3000/digitalizar?model=1", true);
  xhr.setRequestHeader('Content-Type', 'text/plain');
  xhr.send(JSON.stringify({
    value: primerArchivo
  }));
});


function codificar(im){ 
  var i=new Image(); 
  i.onload=function(){ 
      var canvas=document.createElement('canvas'), 
      ctx=canvas.getContext('2d'); 
      canvas.width=300; 
      canvas.height=400; 
      ctx.drawImage(im,0,0,300,400); 
  console.log(canvas.toDataURL().split('base64,')[1]); 
  } 
  i.src=im; 
} 
