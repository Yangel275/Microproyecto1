const ahorcado = document.querySelector(".cajaAhorcado img");
const mostrarpalabra = document.querySelector(".mostrar-palabra");
const adivinado = document.querySelector(".intentos b");
const telcadoDiv = document.querySelector(".teclado");
const Gamemodal = document.querySelector(".game-modal");
const reinicio = document.querySelector(".reiniciar");


let palabraselect,palabrascorrectas = [], conteoerrores = 0;
const maxadivinar = 6;

const reiniciarjuego = () =>{
    palabrascorrectas = []; 
    conteoerrores = 0;
    ahorcado.src = `images/hangman-${conteoerrores}.svg`;
    adivinado.innerText = `${conteoerrores} /${maxadivinar}`;
    telcadoDiv.querySelectorAll("boton").forEach(btn => btn = false);
    mostrarpalabra.innerHTML = palabraselect.split("").map(()=> '<li class="letra"></li>').join("");
}


const palabrarandom = () => {
    // Se selecciona de manera al azar tanto la palabra y pista
    const {palabra,pista} = listapalabras[Math.floor(Math.random() * listapalabras.length)];
    palabraselect = palabra;
    console.log(palabra,pista);
    document.querySelector(".texto-pista b").innerText = pista;
    reiniciarjuego();
    mostrarpalabra.innerHTML = palabra.split("").map(()=> '<li class="letra"></li>').join("");
    Gamemodal.classList.remove("mostrar")
}

const juegoterminado = (victoria) =>{
    setTimeout(() => {
        const modalText = victoria ? `You found the word:` : `The correct word was`; 
        Gamemodal.querySelector("img").src = `images/${victoria ? 'victory': 'lost' }.gif`;
        Gamemodal.querySelector("h4").innerText = `${victoria ? 'Felicidades': 'Juego terminado' }.gif`;
        Gamemodal.querySelector(".img").innerHTML = `${modalText} <b>${palabraselect}</b>`;
        Gamemodal.classList.add("mostrar")
    },300);
}

const initjuego = (boton, elegirpalabra) =>{
    // Se chequea so la palabra pertenece en la palabra seleccionada
    if(palabraselect.includes(elegirpalabra)) {
        [...palabraselect].forEach((letra, index) => {
            if(letra === elegirpalabra){
                palabrascorrectas.push(letra);
                mostrarpalabra.querySelectorAll("li")[index].innerText = letra;
                mostrarpalabra.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else{
        // Se indica que ha medida que se comete errores, se actualizará el número de errores, además de acutalizar las imágenes
        conteoerrores ++;
        ahorcado.src = `images/hangman-${conteoerrores}.svg`;
    }
    boton.disieable = true;
    adivinado.innerText = `${conteoerrores} /${maxadivinar}`;

    if(conteoerrores === maxadivinar) return gameOver(false);
    if(conteoerrores.length === palabraselect.length) return gameOver(true);
    
}

// Se crea los btones del teclado y agregar lista de eventos
for (let i = 97; i <= 122; i++) {
    const boton = document.createElement("boton");
    boton.innerText = String.fromCharCode(i);
    telcadoDiv.appendChild(boton);
    boton.addEventListener("click", e => initjuego(e.target, String.fromCharCode(i)));
    
}

palabrarandom();
reinicio.addEventListener("click", palabrarandom);