let img = document.querySelector("img")  //SELECCIONAMOS LA IMAGEN

//ASI CREAMOS UN ARRAY
let fotos = [
    "lobo.jpg",
    "oso.webp",
    "pinguino.jpeg",
]

let foto_actual = 0

let botones = document.querySelectorAll("button")  //COLECCION DE BOTONES

botones[0].addEventListener("click", function(){
    cambiarImagen('izquierda')
    // foto_actual-- 
    // if(foto_actual < 0)
    //    foto_actual = fotos.length -1
    // img.src = fotos[foto_actual]
    
})

botones[1].addEventListener("click", function(){
    cambiarImagen('derecha')
    
})

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      cambiarImagen('izquierda');
    } else if (e.key === 'ArrowRight') {
      cambiarImagen('derecha');
    }
});

function cambiarImagen(direccion) {
    if (direccion == "izquierda") {
        foto_actual--
        if (foto_actual < 0)
            foto_actual = fotos.length-1
        img.src = "img/" + fotos[foto_actual]
    } else if (direccion == "derecha") {
        foto_actual++
        foto_actual %= fotos.length
        img.src = "img/" + fotos[foto_actual]
    }
}