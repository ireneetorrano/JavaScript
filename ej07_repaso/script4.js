/* Reto 4
  Crea un documento HTML que simule aproximadamente el juego
  de Blackjack. Primero entregará al usuario un número aleatorio
  entre 1 y 11. A continuación preguntará al usuario si quiere
  más números. Mientras el usuario conteste que sí, el programa
  generará más números aleatorios entre 1 y 11. Si el usuario
  acumula más de 21 puntos directamente ha perdido.
  Si el jugador deja de pedir números antes de sobrepasar el 21,
  entonces el programa generará cartas aleatorias para el crupier
  para competir contra el jugador y decidir quién ha ganado
  la partida.
*/

let cartaBtn = document.querySelector("#cartaBtn");
let plantarseBtn = document.querySelector("#plantarseBtn");
let marcadorDiv = document.querySelector("#marcadorDiv");

let cartaJugador = [];
let totalJugador = 0;


cartaBtn.addEventListener("click", function(){

  let nuevaCarta = Math.floor(Math.random()* 11 + 1);//  genero numeros entre 
  cartaJugador.push(nuevaCarta);
  totalJugador = sumArrat(cartaJugador);
  marcadorDiv.textContent = cartasJugador + " = " + totalJugador;

  if(totalJugador > 21){
    //sacar un mensaje
    marcadorDiv.innerHTML += " Te has pasado de 21, has perdido";  // Si en el txto hay etiquetas de html 
    //bloquear el boton de sacar carta y sustituir por empezar
    cartaBtn.textContent = "Empezar";                              //q queremos que represente tenemos q poner INNER HTML
   //vaciar las cartas de la mano
    cartasJugador = [];
  }
})

plantarseBtn.addEventListener("click", function(){
  //si el jugador no ha sacado ninguna carta todavia, este click no hace nada
  if(cartasJugador.length == 0) return;
  let totalCrupier = 0;
  while(totalCrupier < 17 && totalCrupier < totalJugador){
    totalCrupier = totalCrupier + Math.floor(Math.random()* 11 + 1);
  }

    marcadorDiv.innerHTML += "<br> El crupier ha obtenido "+ totalCrupier;
  //comprobar quien ha ganado
  if(totalCrupier > 21 || totalCrupier <= 17){
    //gana el jugador
    marcadorDiv.innerHTML += "<br> Has ganado"
  } else if(totalCrupier == totalJugador){
    //empate
    marcadorDiv.innerHTML += " Empate, el crupier ha igualado tu puntuación";
  } else {
    //pierdes
    marcadorDiv.innerHTML += " <br> Pierdes la partida";
  }
  
  cartasJugador = [];
  cartaBtn.textContent = "Empezar";

  //una de las dos: el crupier se ha pasado o igualado a 17 o ha superado al jugador 
  //comprobar primero si se ha pasado el crupier

})

function sumArrat(array){
  return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
