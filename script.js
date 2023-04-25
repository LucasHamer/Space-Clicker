var score = document.getElementById("score");
var x = 0;
var multiplicador = 1;

var valor = 20;
var costo = document.getElementById("costo");
const activarBoton = document.getElementById("moreClick");

var audioClick = document.getElementById("audio-click");

const imagenes = ["assets/Planets/planet00.png", "assets/Planets/planet01.png", "assets/Planets/planet02.png", "assets/Planets/planet03.png",
    "assets/Planets/planet04.png", "assets/Planets/planet05.png", "assets/Planets/planet06.png", "assets/Planets/planet07.png", "assets/Planets/planet08.png",
    "assets/Planets/planet09.png"]

function upgrade() {
    if (x >= valor) {
        multiplicador *= 2;
        x = 0;
        score.textContent = "Score: " + x;
        valor *= 5;
        costo.textContent = "Costo: " + valor;
        audioClick.currentTime = 0.6;
        audioClick.play();
        audioClick.volume = 0.05;
    }
}

function sumaClicks() {
    x = x + multiplicador;
    score.textContent = "Score: " + x;

    if (x >= valor) {
        activarBoton.disabled = false;
        document.getElementById("moreClick").style.opacity = "1"; // ajusta la opacidad del botón a 1
    } else {
        activarBoton.disabled = true;
        document.getElementById("moreClick").style.opacity = "0.5"; // ajusta la opacidad del botón a 0.5
    }

    audioClick.currentTime = 0.6;
    audioClick.play();
    audioClick.volume = 0.05;

    if (x >= costoDestruir) {
        activarExplosion.disabled = false;
        document.getElementById("destruir").style.opacity = "1";
    } else {
        activarExplosion.disabled = true;
        document.getElementById("destruir").style.opacity = "0.5";
    }

}
function mute() {
    let audio = document.getElementById("ambiente");
    let boton = document.getElementById("mute");

    if (audio.volume === 0) {
        audio.volume = 0.02;
        boton.innerHTML = "MUTE";
    } else {
        audio.volume = 0;
        boton.innerHTML = "UNMUTE";
    }
}

const activarExplosion = document.getElementById("destruir");
var audioExplosion = document.getElementById("audioExplosion");

var contador = 0;
const planets = document.querySelector('.planets');
planets.style.backgroundImage = `url(${imagenes[contador]})`;

var costoDestruir = 500;

function destruir() {
    if (x >= costoDestruir) {
        costoDestruir *= 8;

        let explosion = document.getElementById("explosion");
        explosion.classList.add("explosion-anim");
        explosion.style.opacity = 1;
        explosion.style.zIndex = 5;
        explosion.style.transform = 'translate(-50%, -50%)';

        audioExplosion.currentTime = 0.6;
        audioExplosion.play();
        audioExplosion.volume = 0.3;

        contador++;

        setTimeout(function () {
            explosion.style.zIndex = -5;
            explosion.classList.remove("explosion-anim");
            explosion.style.opacity = 0;
            explosion.style.transform = 'translate(-50%, -50%)';

            planets.style.backgroundImage = `url(${imagenes[contador]})`;
            if (contador >= 10) {
                alert("Juego Finalizado");
            } else {
                alert("Nivel Pasado");
            }
        }, 2000);
        x = 0;
        score.textContent = "Score: " + x;
        document.getElementById("destruir").style.opacity = "0.5";
    }
}