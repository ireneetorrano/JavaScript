/* Reto 1
Crea un documento HTML que solicite cuántos caramelos tienes
 y entre cuántas personas quieres repartirlos.
 A continuación el programa escribirá el mensaje:
 "Si tienes __ caramelos y hay __ personas,
 tienes que repartir __ caramelos a cada uno
 y te sobran __ caramelos".
*/

let numCaramelosInput = document.querySelector("#numCaramelosInput");
let numPersonasInput = document.querySelector("#numPersonasInput");
let btnRepartir = document.querySelector("button");
let resultadoTa = document.querySelector("#resultadoTA");

numCaramelosInput.focus();
numCaramelosInput.value = "";

function repartir()
{
    let caramelos = numCaramelosInput.value;
    let personas = numPersonasInput.value;

    let reparto = Math.floor(caramelos / personas);
    let sobrantes = caramelos % personas;

    resultadoTa.value = "Cada persona tocara a " +reparto + " caramelos y sobraran " + sobrantes+ " caramelos";

}
numCaramelosInput.addEventListener("keyup", function(ev)
{
    if(ev.key == "Enter")
    {
        let caramelos = numCaramelosInput.value.trim();

        if(caramelos.length !== 0 && !isNaN(caramelos) && caramelos > 0)
        {   
            numPersonasInput.focus();
        }
        else
            resultadoTa.value = "Introduce un número válido de caramelos";
    }   
})

numPersonasInput.addEventListener("keyup", function(ev)
{
    if(ev.key == "Enter")
    {
        let personas = numPersonasInput.value.trim();

        if(personas.length !== 0 && !isNaN(personas) && personas > 0)
        {   
            repartir();
        }
        else
            resultadoTa.value = "Introduce un número válido de personas";
    }   
})

btnRepartir.addEventListener("click", function(ev)
{
    let caramelos = numCaramelosInput.value.trim();
    let personas = numPersonasInput.value.trim();

    if(Number.isInteger(parseInt(caramelos)) && caramelos >0)
    { 
        if(Number.isInteger(parseInt(personas)) && personas >0)
            repartir();
    }
  
})