//Codigo inicial
const submitBtn = document.getElementById("submitBtn");
const input = document.getElementById("nameInput");
const message = document.getElementById("message");
const overlay = document.getElementById("overlay");

function daysUntil(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const target = new Date("2025-12-17T00:00:00");

submitBtn.addEventListener("click", () => {
    const value = input.value.trim().toLowerCase();
    if (value === "su nombre") {
        overlay.innerHTML =
            '<h2 class="access">BIENVENIDO 🎉</h2><p>Has accedido correctamente.</p>';
    } else {
        const remainingDays = daysUntil(target);
        message.innerHTML = `🚧 ESTA PÁGINA TODAVÍA ESTÁ EN CONSTRUCCIÓN.<br>SE DESBLOQUEARÁ EN <b>${remainingDays}</b> DÍAS.`;
    }
});

//Cambiar fondo con flores
let petalCount;
  const width = window.innerWidth;

  if (width < 600) {
    petalCount = 20;   // móvil
  } else if (width < 1000) {
    petalCount = 37;   // tablet
  } else {
    petalCount = 60;   // PC
  }

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    document.body.appendChild(petal);

    resetPetal(petal);
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


console.log("Script Funcionando✅")
