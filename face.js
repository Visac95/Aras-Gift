const video = document.getElementById("video");
const estado = document.getElementById("estado");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("https://cdn.jsdelivr.net/npm/face-api.js/weights"),
    faceapi.nets.faceRecognitionNet.loadFromUri("https://cdn.jsdelivr.net/npm/face-api.js/weights"),
    faceapi.nets.faceLandmark68Net.loadFromUri("https://cdn.jsdelivr.net/npm/face-api.js/weights")
]).then(iniciar);

async function iniciar() {
    estado.innerText = "ACTIVANDO CAMARA...";

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
        validarRostro();
    };
}

async function cargarReferencia() {
    const img = await faceapi.fetchImage("face.jpg");
    const deteccion = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
    return deteccion.descriptor;
}

async function validarRostro() {
    estado.innerText = "CARGANDO ROSTRO DE REFERENCIA...";
    const descriptorReferencia = await cargarReferencia();

    estado.innerText = "COMPARANDO ROSTRO...";

    const faceMatcher = new faceapi.FaceMatcher(
        [new faceapi.LabeledFaceDescriptors("usuario", [descriptorReferencia])]
    );

    setInterval(async () => {
        const deteccion = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!deteccion) {
            estado.innerText = "NO SE DETECTA UN ROSTRO...";
            return;
        }

        const resultado = faceMatcher.findBestMatch(deteccion.descriptor);

        if (resultado.distance < 0.45) {
            accesoPermitido();
        } else {
            estado.innerText = "ROSTRO NO COINCIDE";
        }

    }, 1000);
}

function accesoPermitido() {
    estado.innerText = "ACCESO PERMITIDO ✔";
    video.style.display = "none";

    document.body.innerHTML = `
        <h1>BIENVENIDO</h1>
        <p>ROSTRO VERIFICADO CORRECTAMENTE.</p>
    `;
}
