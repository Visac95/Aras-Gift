// ===============================
// AUTO-REPRODUCCIÓN DEL AUDIO
// ===============================
var audio = document.getElementById("audio");
let audioContext;
let analyser;
let dataArray;

// ===============================
// INICIO SEGURO (SIN AUTOPLAY)
// ===============================
window.addEventListener("load", () => {
  audio.pause(); // aseguro que NO suene
  audio.currentTime = 0; // siempre empieza desde el inicio
  iniciarEqualizer(); // solo crea las barras
});

// ===============================
// ACTIVAR AUDIOCONTEXT CUANDO EL USUARIO TOQUE LA PANTALLA
// ===============================
window.addEventListener("click", iniciarAnalizadorSiNoExiste);
window.addEventListener("touchstart", iniciarAnalizadorSiNoExiste);

function iniciarAnalizadorSiNoExiste() {
  if (audioContext) return; // ya está iniciado

  iniciarAnalizadorDeAudio(audio);
  console.log("AudioContext ACTIVADO");
}
// ===============================
// CREAR BARRAS DEL ECUALIZADOR
// ===============================
function iniciarEqualizer() {
  const cont = document.getElementById("equalizer");
  for (let i = 0; i < 12; i++) {
    const b = document.createElement("div");
    b.classList.add("bar");
    cont.appendChild(b);
  }
}

// ===============================
// ANALIZADOR DE AUDIO
// ===============================
function iniciarAnalizadorDeAudio(audioElement) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioCtx();

  const source = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;

  dataArray = new Uint8Array(analyser.frequencyBinCount);

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  animarEqualizer();
}

// ===============================
// ANIMACIÓN DEL ECUALIZADOR
// ===============================
function animarEqualizer() {
  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);
  const bars = document.querySelectorAll(".bar");

  // Evitar que use frecuencias muy altas (que no tienen energía)
  const maxUsableFreq = Math.floor(dataArray.length * 0.65);
  const slice = Math.floor(maxUsableFreq / bars.length);

  bars.forEach((bar, i) => {
    let sum = 0;

    // promediamos la parte útil del espectro
    for (let j = 0; j < slice; j++) {
      const index = i * slice + j;
      if (index < maxUsableFreq) {
        sum += dataArray[index];
      }
    }

    let avg = sum / slice;

    // BOOST SUAVE para que todas las barras se muevan
    avg = avg * 1.4; // impulso del 40%

    // límite y mapeo a altura visual
    let height = Math.min((avg / 255) * 170, 170);

    bar.style.height = `${7 + height}px`;
  });

  requestAnimationFrame(animarEqualizer);
}

const startScreen = document.getElementById("start-screen");
let audioStartedOnce = false;

// Evitar que el audio inicie solo
audio.pause();
audio.currentTime = 0;

// Al tocar cualquier parte de la pantalla
document.addEventListener("click", async () => {
  // Si es la primera vez → quitar pantalla negra
  if (!audioStartedOnce) {
    audioStartedOnce = true;

    startScreen.style.opacity = "0";
    setTimeout(() => {
      startScreen.style.display = "none";
    }, 400);

    // Iniciar animación
    animarEqualizer();
  }

  // Toggle: si está pausado → reproduce
  if (audio.paused) {
    try {
      await audio.play();
    } catch (e) {
      console.log("Interacción requerida por el navegador.");
    }
  }
  // Si está sonando → pausa
  else {
    audio.pause();
    document.getElementById("pause-hintid").style.display = "none";
  }
});

// ===============================
// CONTROL DE CAMBIO DE AUDIO Y REDIRECCIÓN
// ===============================
audio.addEventListener("ended", () => {
  console.log("Audio terminado. Analizando siguiente paso...");

  // CONFIGURACIÓN:
  // Pon aquí la parte única del nombre de tu segundo archivo
  const nombreSegundaCancion = "Una-Flor-Samuel-Ararat";

  // Rutas de los archivos
  const nuevoAudio = "../audio/Una-Flor-Samuel-Ararat.mp3";
  const nuevosSubs = "../assets/una-flor-fl-sub.vtt";

  setTimeout(() => {
    // === VERIFICACIÓN ===
    // ¿El audio que acaba de terminar contenía el nombre de la segunda canción?
    if (audio.src.includes(nombreSegundaCancion)) {
      console.log("Segunda canción finalizada. Redirigiendo al inicio...");
      window.location.href = "index.html";
    } else {
      // Si NO era la segunda, asumimos que era la primera y hacemos el cambio
      console.log(
        "Primera canción finalizada. Cambiando a: " + nombreSegundaCancion
      );

      // 1. Cambiar Audio
      audio.src = nuevoAudio;

      // 2. Cambiar Subtítulos
      const trackElement = document.getElementById("track");
      if (trackElement) {
        trackElement.src = nuevosSubs;
      }

      // 3. Cargar y Reproducir
      audio.load();
      audio
        .play()
        .then(() => console.log("Reproduciendo segunda canción..."))
        .catch((e) => console.error("Error al reproducir:", e));
    }
  }, 4000); // Espera de 2 segundos antes de cambiar o redirigir
});
