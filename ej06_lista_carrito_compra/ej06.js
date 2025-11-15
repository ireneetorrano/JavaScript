//código JS
let textAdd=document.querySelector("#txtAdd");
let myList=document.querySelector("#mylist");
let myCart=document.querySelector("#mycart");

let btnSelAll=document.querySelector("#btnSelAll");
let btnSelNot=document.querySelector("#btnSelNot");
let btnInvSel=document.querySelector("#btnInvSel");
let btnMovSel=document.querySelector("#btnMovSel");
let btnDelSel=document.querySelector("#btnDelSel");
 
let btnEmpCar = document.querySelector("#btnEmpCar");
let btnAddUnitCar = document.querySelector("#btnAddUnitCar")

//la funcion focus se usa para que al cargar la página el cursor se ponga directamente en la caja de texto
txtAdd.focus();
         
txtAdd.addEventListener("keyup",function(ev)
{
        if(ev.key ==="Enter")
        {
            //recuperar el producto que se ha escrito en la caja
            let producto = txtAdd.value.trim(); //trim elimina los espacios en blanco al principio y al final
            if(producto.length > 0)
            {
                    //crear item de LISTA html
                let nuevoLI = document.createElement("LI");
                    //darle contenido a ese ITEM de LISTA para que se muestre el producto
                nuevoLI.textContent = producto;
                    //conectar ese nuevo elemento LI al árbol DOM existente
                myList.append(nuevoLI);                                       //PADRE(destino) APPEND HIJO(origen) (CONEXION AL ARBOL)
                    //vaciar la caja de texto para la comunidad del usuario
                txtAdd.value= "";
                   //el nuevo LI sea cliclable para que el usuario pueda seleccionarlo 
                nuevoLI.addEventListener("click", function(){
                    nuevoLI.classList.toggle("seleccionado");  // toggle cambia de on a off o al contrario
                    // if(nuevoLI.classList.contains("seleccionado"))
                    //     nuevoLI.classList.remove("seleccionado");
                    // else
                    //     nuevoLI.classList.add("seleccionado");
                });                
            }else{
                txtAdd.placeholder="No dejes este campo vacío";
                
            }
        }
})

btnSelAll.addEventListener("click",function()
{    
    // #id, sin nada = etiqueta
    let productos = document.querySelectorAll("#mylist li");  //todos los li del elemento #mylist
    //let productos = document.querySelectorAll("#mylist>li");  //todos los hijos directos li del elemento #mylist
    for(let i = 0; i < productos.length; i++)
        productos[i].classList.add("seleccionado");
})

btnSelNot.addEventListener("click",function()
{    
    // #id, sin nada = etiqueta
    let productos = document.querySelectorAll("#mylist li");  //todos los li del elemento #mylist
    //let productos = document.querySelectorAll("#mylist>li");  //todos los hijos directos li del elemento #mylist
    productos.forEach(e =>
        {
        e.classList.remove("seleccionado");
    })
})

btnInvSel.addEventListener("click",function()
{
    let productos  = document.querySelectorAll("#mylist li"); 
    productos.forEach(e =>
    {
        e.classList.toggle("seleccionado");
    })
})

btnDelSel.addEventListener("click",function()
{
    let productos  = document.querySelectorAll("#mylist li.seleccionado");  //solo los productos de mi lista que estan seleccionados 
    productos.forEach(e =>  e.remove() )                                                  // por lo q ya no es #mylist li sino los li q esten selecionados 
})

btnMovSel.addEventListener("click",function()
{
    let seleccionados = document.querySelectorAll("#mylist li.seleccionado");
    seleccionados.forEach(e => {   
        //creo un nuevo LI para mycart
        let nuevoLI = document.createElement("LI");
        //al nuevo LI le copio el texto q tiene el LI original
        nuevoLI.textContent = e.textContent;
        //conectar a mycart el nuevo LI
        nuevoLI.addEventListener("click", function() {
            nuevoLI.classList.toggle("seleccionado");
        });
        mycart.append(nuevoLI);
        //elinimamos el li original de mylist
        e.remove();
        //    myCart.append(e);         // mover el elemento de una lista a otra 
    });
})

btnEmpCar.addEventListener("click", function()
{
    let productos = document.querySelectorAll("#mycart li");
    productos.forEach(e => e.remove());
    // mycart.innerHTML = "";  //otra forma de vaciar la lista (menos eficiente que el forEach)
})

btnAddUnitCar.addEventListener("click", function(){
    let seleccionados = document.querySelectorAll("#mycart li.seleccionado");
    seleccionados.forEach(e => {
        let duplicado = e.cloneNode(true);  //  ------------>  CLONENODE clonamos el producto seleccionado
        duplicado.addEventListener("click", function() {  //-------> le añadimos esta funcion para q sea clickable
            duplicado.classList.toggle("seleccionado");
        });
        myCart.append(duplicado);   // Lo añadimos al dom de carrito para q aparezca
    });
})
