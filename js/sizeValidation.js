const minWidtSize = 1024;
var windowWith = window.innerWidth;

window.addEventListener("load", () => {
  console.log("Validando tamaño de pantalla");
  validarPantalla();
});

window.addEventListener("resize", () => {
  windowWith = window.innerWidth;
  validarPantalla();
});

function validarPantalla() {
    if (windowWith >= minWidtSize) {
        window.location.href = "face.html";
    }
}