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
const numberOfFlowers = 100; // cantidad de flores
const body = document.body;

for (let i = 0; i < numberOfFlowers; i++) {
    // Crear tallo
    const flower = document.createElement("div");
    flower.classList.add("flower");

    // Posición horizontal aleatoria
    const x = Math.random() * window.innerWidth;
    flower.style.left = `${x}px`;

    // Altura aleatoria
    const height = 30 + Math.random() * 70;
    flower.style.height = `${height}px`;

    // Crear capullo
    const bud = document.createElement("div");
    bud.classList.add("bud");
    bud.style.left = `${x + 2}px`; // centrar sobre el tallo
    bud.style.bottom = `${height}px`; // en la punta del tallo

    // Animación aleatoria de inicio
    bud.style.animationDelay = `${Math.random() * 3}s`;

    body.appendChild(flower);
    body.appendChild(bud);
}
console.log("Script Funcionando✅")
