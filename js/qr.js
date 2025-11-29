//Codigo inicial

const overlay = document.getElementById("overlay");
//Cambiar fondo con flores

let petalCount;
const width = window.innerWidth;

if (width < 600) {
  petalCount = 20; // móvil
} else if (width < 1000) {
  petalCount = 37; // tablet
} else {
  petalCount = 60; // PC
}
function crearPetalos() {
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    document.body.appendChild(petal);

    resetPetal(petal);
  }
}

function resetPetal(petal) {
  const size = 10 + Math.random() * 25;
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 6;
  const delay = Math.random() * -duration; // empieza en distintos tiempos

  petal.style.width = `${size}px`;
  petal.style.height = `${size * 0.8}px`;
  petal.style.left = `${left}vw`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;
}


window.onload = () => {
  crearPetalos();
};

