/* Reto 2
 Crea un documento HTML que solicite
 al usuario números por separado
 y escriba en el documento cuál es
 la diferencia entre el mayor y el menor.
*/

let numeroInput = document.querySelector("#numeroInput");
let numerosTA = document.querySelector("#numerosTA");
let calcularBtn = document.querySelector("#calcularBtn")
let vaciarBtn = document.querySelector("#vaciarBtn")
let resultadoTA = document.querySelector("#resultadoTA")

let numeros = []
numeroInput.focus();

numeroInput.addEventListener("keyup", function(ev){
    if(ev.key == "Enter")
    {
        let numero = parseFloat(numeroInput.value)
        
        if(!isNaN(numero))
        {
            numeros.push(numero)
            numerosTA.value = numeros
        }
        numeroInput.value = "";     
    }
})

calcularBtn.addEventListener("click", function(ev){

})


