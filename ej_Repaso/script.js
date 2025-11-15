//CODIGO JS
//REDACTO EL CODIGO:
//1. Para empezar los primeros id que voy a utilizar, a continuacion pongo el foco
// donde quiero que se ventre el programa al abrirlo
//2.Añado evento al boton primer, añadir tarea, va a ser al darle al enter, en ese momento
//la funcion va a comprobar con un if si la tecla a la que le he dado corresponde con el ENTER
//De ser asi declaramos una variable para guardar el valor sin espacios del lo introducido.
//Despues comprobamos que el valor introducido es decir que la longitud de la cadena es mayor que cero,
//en ese caso se crearia un nuevo elemento que va a ser las tareas que se vayan poniendo en la LISTA,
//A continuacion ese contenido de texto se lo asignamos a la variable tarea, y declaramos de quien va a 
//heredar o colgar ese elemento CON APPEND, y asi pasa de la caja a la LISTA, por lo que despues de ese proceso
//vaciar la caja.
//Para que el nuevo elemento de la lista (nuevoLi) sea clickable y pueda estar seleccionado o no, caracteristica 
//que añadimos en el css, si eso no se cumple se le mostrara en el else al usuario  un mensaje para no dejar el campo vacio

let txtAdd = document.querySelector("#txtAdd")
let btnAdd = document.querySelector("#btnAdd")

txtAdd.focus();

txtAdd.addEventListener("keyup", function(e){

    if(e.key === "Enter")
    {
        let tarea = txtAdd.value.trim()
        if(tarea.length > 0)
        {
            let nuevoLi = document.createElement("li")
            nuevoLi.textContent = tarea
            dolist.append(nuevoLi)
            txtAdd.value = " "

            nuevoLi.addEventListener("click", function()
            {
                nuevoLi.classList.toggle("seleccionado")
            })
        }else{
            txtAdd.placeholder = "Escribe una tarea"
        }
    }
})

