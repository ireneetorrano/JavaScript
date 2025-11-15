// código JS

// boton, cuando se te haga clic calcula el doble del número de la caja y muéstralo

// 1º recuperar el botón
let calc_btn = document.querySelector("#calc_btn") // el # es para decirle que tiene un id
// 2º asignarle instrucciones para cuando sea cliclado 
calc_btn.addEventListener("click", function(){
    //2º.a) recuperar el texto de la caja (1º recuperar caja y 2º perdirle su value)
    let entrada_inp = document.querySelector("#entrada_inp")
    let numero = entrada_inp.value 
    //2º.b) calcular el doble
    let doble = numero * 2
    //2º.c) mostrar en pantalla
    let resul_lbl = document.querySelector("#resul_lbl")
    resul_lbl.textContent = doble
} )



/*
VALUE
cajas de texto inputs
textarea
radio button
checkbox
select listas desplegables

TEXTCONTENT
h1..h5
p
label
button
li
*/