// JS/GIF.JS - CONTROL LIGERO DE LA ANIMACION
// SE INICIA ANIMACION AL PRESIONAR 'INICIAR ANIMACION'.
// TAMBIEN PERMITE REINICIAR.

// EVITAR EJECUCIONES PESADAS: SOLO TOGGLING DE ANIMACIONES CSS
document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');

  // ELEMENTOS ANIMABLES (SE USAN PARA CAMBIAR ANIMATION-PLAY-STATE)
  const sun = document.getElementById('sunGroup');
  const stopTop = document.getElementById('stopTop');
  const stopBottom = document.getElementById('stopBottom');
  const radio = document.getElementById('radio');
  const indicator = document.getElementById('indicator');
  const table = document.getElementById('table');
  const dust = document.querySelectorAll('#dust .d');

  // DURACION EN MS PARA REINICIO AUTOMATICO OPCIONAL
  const DURATION_MS = 9000; // COINCIDE CON --duration-sun

  function playAnimations() {
    // PONER ANIMACIONES EN PLAY
    [sun, stopTop, stopBottom, radio, indicator, table, ...dust].forEach(el => {
      if (!el) return;
      el.style.animationPlayState = 'running';
    });

    // OPCIONAL: AL FINAL DE ANIMACION, DEJAR RADIO EN PULSACION SUAVE
    clearTimeout(playAnimations._t);
    playAnimations._t = setTimeout(() => {
      // DEJAR RADIO EN PULSACION (ya esta infinito)
      // SI QUIERES QUE HAGA ALGO AL FINAL, AGREGALO AQUI
    }, DURATION_MS + 200);
  }

  function stopAnimations() {
    // PAUSAR y REINICIAR (el reinicio real se hace forzando reflow)
    [sun, stopTop, stopBottom, radio, indicator, table, ...dust].forEach(el => {
      if (!el) return;
      el.style.animationPlayState = 'paused';
    });
  }

  function resetAnimations() {
    // PAUSA
    stopAnimations();

    // REINICIAR FORZANDO REMOVER Y VOLVER A AÑADIR LA CLASE DE ANIMACION
    // Pero como usamo CSS animations en inline style, hacemos reflow para reiniciar
    const nodes = [sun, stopTop, stopBottom, radio, indicator, table, ...dust].filter(Boolean);
    nodes.forEach(el => {
      // Elimina inline style que pone 'running' o 'paused'
      el.style.animationPlayState = 'paused';
      // REPAINT HACK: leer offsetHeight para forzar reflow
      void el.offsetHeight;
      // dejar pausado hasta que el usuario presione iniciar
    });
  }

  // BOTONES
  startBtn.addEventListener('click', () => {
    playAnimations();
  });

  resetBtn.addEventListener('click', () => {
    resetAnimations();
  });

  // INICIO: dejar animaciones en pausa hasta que el usuario presione iniciar
  resetAnimations();

  // OPCIONAL: INICIAR AUTOMATICO SI QUIERES (DESCOMENTAR)
  // playAnimations();
});
