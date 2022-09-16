// Obtener referencia al input y a la imagen
  $seleccionArchivos = document.querySelector("#seleccionArchivos"),
  $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion"),
  $btnDigitalizar = document.querySelector("#btn-digitalizador");
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
  var data = primerArchivo;
  UploadDataData(primerArchivo)

  /*var myHeaders = new Headers();
  myHeaders.append("Content-Type", "image/png");
  
  var file = primerArchivo;
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: file,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:3000/digitalizar", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    */

 /*   const archivos = $seleccionArchivos.files;
    const blob = archivos[0];
 
    var filename = archivos[0].name;
    const CHUNK_SIZE = 1024*1024; //Lo troceamos de 1Mb en 1Mb.
    var start = 0;
    var end = CHUNK_SIZE;
    var chunkNmbr = 1;  //Contará el trozo en el que vamos
    //El número de trozos en los que se va a dividir el archivo
    var numberOfChunks = Math.floor(blob.size/CHUNK_SIZE);
    if (blob.size % CHUNK_SIZE > 0 ) numberOfChunks++;
 
      while(start < blob.size) {
        uploadChunk(filename, blob.slice(start, end), chunkNmbr);
 
        start = end;  //Comienzo del siguiente trozo
        end = start + CHUNK_SIZE; //Final del siguiente trozo
      }
*/
    /*fetch('http://127.0.0.1:3000/digitalizar', {
      method: 'POST', body: JSON.stringify({img: primerArchivo}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}}).then(function (response) {
        if (response.ok) { 
          return response.json();}
        return Promise.reject(response);}).then(function (data) {
        console.log(data);}).catch(function (error) {console.warn('Something went wrong.', error);});*/
    
});


function uploadChunk(filename, blobchunk, chunkNumber) {
  //Generamos los datos e enviar que llevan...
  var frmData = new FormData();
  //...el archivo con su nombre, y...
  frmData.append('file', blobchunk, filename);
  //...el número de trozo que se recibe, para guardarlo en el orden adecuado
  frmData.append('chunkNum', chunkNumber);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:3000/digitalizar', true);
  xhr.data
  xhr.send(frmData);
}


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

  
