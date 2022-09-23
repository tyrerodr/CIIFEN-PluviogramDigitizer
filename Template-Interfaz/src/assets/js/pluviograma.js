window.addEventListener('load', function() {
    var contenedor = this.document.getElementById("topPluviograma");
    var pathname = window.location.pathname;
    var id = pathname.split("/").pop(); 
    console.log(id);
    fetch('http://127.0.0.1:3000//pluviograma/' + id)
    .then(texto => texto.json())
    .then(datos => {
      console.log(datos)
      for (let pluviogramas of datos) { 
        contenedor.innerHTML+='<div class = "row justify-content-md-center title"><h1 class="pb-3 pt-2">Información del Pluviograma: '+ pluviogramas[0] +'</h1></div>'
          };

      })

  });