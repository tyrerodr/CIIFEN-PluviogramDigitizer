window.addEventListener('load', function() {
    var container = this.document.getElementById("topPluviograma");
    var pathname = window.location.pathname;
    var id = pathname.split("/").pop(); 

    fetch('http://127.0.0.1:3000/pluviogram/' + id)
    .then(text => text.json())
    .then(data => {
      for (let pluviograms of data) { 
        container.innerHTML+='<div class = "row justify-content-md-center title"><h1 class="pb-3 pt-2">Información del Pluviograma: '+ pluviograms[0] +'</h1></div>'
          };

      })

  });