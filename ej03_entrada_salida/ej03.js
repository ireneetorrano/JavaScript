let entrada_inp = document.querySelector("#entrada_inp")
//entrada_inp es un caja de texto declarada en el html  //    codigo que se va a ejejutar, en el parentesisi de function hay q declarar el evento
let saludar_btn = document.querySelector("#saludar_btn")
let saludo_lbl = document.querySelector("#saludo_lbl")  // # es para id

    function saludar(){
        let nombre = entrada_inp.value // recuperamos el valor de la caja de texto
        // saludar en el LABLE
        saludo_lbl.textContent = "Hola, " + nombre
    }

entrada_inp.addEventListener("keyup", function(e){
    //AQUI PONEMOS LO QUE QUEREMOS QUE EJECUTE 
    //DISTINGUIR SI LA TECLA PULSADA ES UN INTRO 

    if(e.key === "Enter")
        // recuperamos lo que el usuario ha escrito
        saludar()
    })

    saludar_btn.addEventListener("click", function(){
    saludar()

})


        