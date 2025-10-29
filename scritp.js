//Codigo inicial
const submitBtn = document.getElementById("submitBtn");
const input = document.getElementById("nameInput");
const message = document.getElementById("message");
const overlay = document.getElementById("overlay");
const mensajeEspera = document.getElementById("mensajeEspera");

function daysUntil(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const target = new Date("2025-12-17T00:00:00");
const remainingDays = daysUntil(target);

submitBtn.addEventListener("click", () => {
    const value = input.value.trim().toLowerCase();
    if (value === "su nombre") {
        overlay.innerHTML =
            '<h2 class="access">BIENVENIDO 🎉</h2><p>Has accedido correctamente.</p>';
    } else {
        const remainingDays = daysUntil(target);

        // 🔧 Define la fecha de inicio de construcción
        const startDate = new Date("2025-10-29"); // <-- cámbiala si quieres otra
        const today = new Date();

        // 🔢 Calcula cuántos días han pasado desde el inicio
        const msElapsed = today - startDate;
        const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));

        // 🧱 Mensaje final
        message.innerHTML = `
    🚧 ESTA PÁGINA SE ENCUENTRA EN CONSTRUCCIÓN.<br>
    YA LLEVA <b>${daysElapsed}</b> DÍAS DE TRABAJO Y AÚN NO ESTÁ LISTA.<br>
    ⏳ SE DESBLOQUEARÁ EN <b>${remainingDays}</b> DÍAS.
  `;
        overlay.style.display = "none";
        mensajeEspera.style.display = "block";
    }
});

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

for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
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

setTimeout((document.title = `Aun faltan ${remainingDays} días`),100);

console.log("Script Funcionando✅");
