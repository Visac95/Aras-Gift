// const audio = document.getElementById('audio');
  const trackElement = document.getElementById('track');
  var subtitleDiv = document.getElementById('contenedor-subtitulos');

  // Asegurarnos de que la pista de texto esté cargada
  trackElement.addEventListener('load', function() {
    const textTrack = this.track;
    
    // Modo 'hidden' permite que JS lea los cues pero el navegador no intente mostrarlos (lo cual fallaría en audio)
    textTrack.mode = 'hidden'; 

    // Escuchar cambios en los "cues" (las líneas de subtítulos)
    textTrack.oncuechange = function() {
      var cue = this.activeCues[0]; // Obtener el subtítulo actual
      if (cue) {
        subtitleDiv.innerHTML = cue.text;
        console.log(cue.text)
      } else {
        subtitleDiv.innerText = ''; // Limpiar si no hay subtítulo
      }
    };
  });