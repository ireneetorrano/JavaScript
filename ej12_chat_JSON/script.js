const chat = document.querySelector("#chat")
const nick = document.querySelector("#nick")
const teclado = document.querySelector("#teclado")

teclado.addEventListener("keyup", function (e) {
    if (e.key === "Enter")
    {   
        //RECUPERAMOS VALORES
        let nickValue = nick.value.trim()
        let mensajeValue = teclado.value

        if (nickValue && mensajeValue)
        {
             let options ={
                method:"POST",
                body: new URLSearchParams("nick="+nickValue+"&mensaje="+mensajeValue)
                }
                fetch("server/chat_insert_post.php",options)
                teclado.value=""
        }
    }  
    })
    let consultador = setInterval(consultarMensajes, 2000)

    let ultimoId = 0  //almacena el id del último mensaje recibido
    
    function consultarMensajes() {
        fetch("server/chat_select_get_json.php?ultimo=" + ultimoId)  //php que devuelve los mensajes en formato JSON
        .then(data => data.json())
            //procesar los datos JSON y mostrar en el div CHAT todos los mensajes llegados en el JSON
            //1. parsear la respuesta JSON que hemos recibido

        .then(arrayMensaje => {
            //2. recorrer el array de mensajes y mostrarlos en el div CHAT
            arrayMensaje.forEach(m => {
                //imprimir cada mensaje en el div CHAT
                //un mensaje m tiene este aspecto: {nick: "pepe", mensaje: "hola"}
                let nuevoDiv = document.createElement("div")
                nuevoDiv.innerHTML = `
                <h5><strong>${m.nick}:</strong></h5>
                <br>
                <span> ${m.mensaje}</span>
                `
                chat.append(nuevoDiv)
                nuevoDiv.classList.add("mensaje")
                ultimoId = m.id
                //hacer scroll hacia abajo para ver el último mensaje
                chat.scrollTop = chat.scrollHeight
            })
        })
    }