// código JS
let entrada_inp = document.querySelector("#entrada_inp")
let jugar_btn = document.querySelector("#juagar_btn")
let result_lbl = document.querySelector("#result_lbl")

let contador = 0

contador++

    
    function comprobar(numero){
        let aleatorio = Math.floor(Math.random() * 100) + 1
        if (numero == aleatorio){
            result_lbl.textContent = "Has ganado! El número era " + aleatorio
        } else {
            result_lbl.textContent = "Fallaste!, vuelve a intentarlo"
        }
    }

    function jugar(){
        let numero = entrada_inp.value

        entrada_inp.textContent = "El numero elegido es: " + numero
        comprobar(numero)
    }