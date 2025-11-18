// ===============================
// AUTO-REPRODUCCIÓN DEL AUDIO
// ===============================
const audio = document.getElementById("audio");
let audioContext;
let analyser;
let dataArray;

// Espera a que cargue todo
window.addEventListener("load", () => {
    // Intento de reproducción automática
    audio.play().catch(() => {
        console.log("Esperando interacción del usuario para iniciar el audio.");
    });

    // Cargar barras de ecualizador
    iniciarEqualizer();
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

    const slice = Math.floor(dataArray.length / bars.length);

    bars.forEach((bar, i) => {
        let sum = 0;
        for (let j = 0; j < slice; j++) {
            sum += dataArray[i * slice + j];
        }
        let avg = sum / slice;
        let height = (avg / 255) * 100;

        bar.style.height = `${20 + height}px`;
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
    }
});
