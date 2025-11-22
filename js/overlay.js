// ==========================================
// SISTEMA: ACUMULADOR DE MENSAJES (APPEND)
// ==========================================

const container = document.getElementById("caja-texto");
const containerUpper = document.getElementById("overlay-especial");

// 1. Función de ayuda para convertir minutos:segundos a segundos totales
function tiempo(minutos, segundos) {
  return minutos * 60 + segundos;
}

const momentosEspeciales = [
  {
    inicio: 2 * 60 + 8,
    texto: "<p>A</p> ti flor hermosa,",
    agregado: false,
  },
  {
    inicio: 2 * 60 + 13,
    texto: "<p>R</p>escatada por Dios",
    agregado: false,
  },
  {
    inicio: 2 * 60 + 18,
    texto: "<p>A</p> ti con cariño",
    agregado: false,
  },
  {
    inicio: 2 * 60 + 24,
    texto: "<p>C</p>anto esta canción",
    agregado: false,
  },
  {
    inicio: 2 * 60 + 30,
    texto: "<p>E</p>s demaciado grande,",
    agregado: false,
  },
  {
    inicio: 2 * 60 + 35,
    texto: "<p>L</p>a bondad de mi Dios",
    agregado: false,
  },
  {
    inicio: 2 * 60 + 40,
    texto: "<p>Y</p>a son 20 años",
    agregado: false,
  },
  {
    inicio: 2 * 60 + 45,
    texto: "Que te ha dado el señor",
    agregado: false,
  },
  {
    inicio: 2 * 60 + 51,
    seAcabo: true,
  },
];

// 3. LÓGICA DE DETECCIÓN Y AGREGADO
audio.addEventListener("timeupdate", () => {
  const tiempoActual = audio.currentTime;
  if (audio.src.includes(nombreSegundaCancion)) {
    // Recorremos la lista de momentos
    momentosEspeciales.forEach((momento) => {
      // CONDICIÓN: Si el tiempo ya pasó Y el elemento NO ha sido agregado aún
      if (tiempoActual >= momento.inicio && !momento.agregado) {
        containerUpper.s;
        // A. Crear el nuevo elemento HTML (puedes usar div, p, h3, etc.)
        const nuevoElemento = document.createElement("div");

        // B. Ponerle el contenido
        nuevoElemento.innerHTML = momento.texto;

        // C. (Opcional) Darle estilos rápidos desde JS para que se separen
        nuevoElemento.style.marginTop = "15px";
        nuevoElemento.style.opacity = "0"; // Inicia invisible para animar
        nuevoElemento.style.transition = "opacity 1s ease"; // Animación suave

        // D. Agregarlo al contenedor (Como hijo)
        container.appendChild(nuevoElemento);

        // E. Forzar un pequeño reflow para que la animación de opacidad funcione
        setTimeout(() => {
          nuevoElemento.style.opacity = "1";
        }, 50);

        // F. IMPORTANTE: Marcar como agregado para que no se repita infinitamente
        momento.agregado = true;

        containerUpper.classList.add("overlay-visible");
        container.classList.add("overlay-visible");

        // Ajuste JS: Forzamos que se apilen verticalmente (por si el CSS original era flex row)
        container.style.flexDirection = "column";
        if (tiempoActual > 113 && momento.seAcabo) {
          container.classList.remove("overlay-visible");
          containerUpper.classList.remove("overlay-visible");
          containerUpper.classList.add("overlay-oculto");
          container.classList.add("overlay-oculto");
          momento.seAcabo = false;
        }
      }
    });
  }
});

// 4. RESET (Importante si el usuario reinicia la canción)
audio.addEventListener("play", () => {
  // Si el audio está al inicio (tiempo 0), limpiamos todo para empezar de nuevo
  if (audio.currentTime < 1) {
    container.innerHTML = ""; // Borra los hijos del HTML
    momentosEspeciales.forEach((m) => (m.agregado = false)); // Reinicia las banderas
  }
});







// 02:08.740 --> 02:15.440
// A ti flor hermosa, rescatada

// 02:15.440 --> 02:16.840
// por Dios.

// 02:17.260 --> 02:25.240
// A ti con cariño, canto

// 02:25.240 --> 02:27.520
// esta canción.

// 02:29.820 --> 02:36.500
// Es demasiado grande, la bondad

// 02:36.500 --> 02:38.500
// de mi Dios.

// 02:40.200 --> 02:46.180
// Ya son veinte años, que

// 02:46.180 --> 02:48.680
// te ha dado el Señor.