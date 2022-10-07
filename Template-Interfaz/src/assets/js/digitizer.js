// Obtener referencia al input y a la imagen
  $fileSelection = document.querySelector("#seleccionArchivos"),
  $imagePreview = document.querySelector("#imagenPrevisualizacion"),
  $btnDigitaizer = document.querySelector("#btn-digitalizador");
// Escuchar cuando cambie
$fileSelection.addEventListener("change", () => {
  // Los archivos seleccionados, pueden ser muchos o uno
  const allFiles = $fileSelection.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!allFiles || !allFiles.length) {
    $imagePreview.src = "";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  const firstFile = allFiles[0];
  // Lo convertimos a un objeto de tipo objectURL
  const objectURL = URL.createObjectURL(firstFile);
  // Y a la fuente de la imagen le ponemos el objectURL
  $imagePreview.src = objectURL;
});

//escuchar cuando click
$btnDigitaizer.addEventListener("click", () => {
  const filesSelect = $fileSelection.files;
  const firstFile = filesSelect[0];
  var data = firstFile;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "image/png");
  var file = firstFile;
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: file,
    redirect: 'follow'
  };

  fetch('http://127.0.0.1:3000/digitize?' + new URLSearchParams({
    image:document.getElementById("seleccionArchivos").value,
    startDate:document.getElementById("inicio").value,endDate:document.getElementById("fin").value,
    model:document.getElementById("FormModelo").value,link:document.getElementById("seleccionArchivos").value,
    station:document.getElementById("FormEstacion").value}), requestOptions)
    .then(response => {
      response.text();
      if(response.status == 200){
        swal({
          title:'Digitalización exitosa!',
          text:'Tu banda fue digitalizada.',
          type: 'success',
          confirmButtonText:'Ok',
          confirmButtonColor: '#0f436b',
        });
      }else{
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error en la digitalización.',
          confirmButtonText:'Ok',
          confirmButtonColor: '#0f436b',
        });
      }
    })
    .catch(error => {console.log('error', error);
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error en la digitalización.',
        confirmButtonText:'Ok',
        confirmButtonColor: '#0f436b',
      });});
      // document.getElementById("#fileSelection").defaultValue = ""
});


