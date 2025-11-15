//código JS

const ANCHURA_TABLERO = 800;
const ALTURA_TABLERO = 500;
const DIAMETRO_BOLA = 30;

let tablero = document.querySelector('#tablero');
let bola = document.querySelector('#bola');
let btnEmpezar = document.querySelector('#btnEmpezar');
let tiempolbl = document.querySelector('#tiempo');
let puntoslbl = document.querySelector('#puntos');
let cuerpoRecords = document.querySelector('#records tbody');

tablero.style.width = ANCHURA_TABLERO + 'px';
tablero.style.height = ALTURA_TABLERO + 'px';
bola.style.width = DIAMETRO_BOLA + 'px';
bola.style.height = DIAMETRO_BOLA + 'px';

let timer_partida
let timer_bola

let partida_en_marcha = false
let records = [
    {nombre: 'Anoniymus', puntos: 10},
    {nombre: 'Anoniymus', puntos: 5},
    {nombre: 'Anoniymus', puntos: 3},
    {nombre: 'Anoniymus', puntos: 2},
    {nombre: 'Anoniymus', puntos: 1},
]
let segundero
let puntos
mostrar_records();

btnEmpezar.addEventListener('click', function()
{
    //empieza la partida
    acabar_partida(); // por si estuviera ya en marcha
    //ponerlos en marcha de nuevo

    segundero = 10
        tiempolbl.textContent = segundero;
    puntos = 0
        puntoslbl.textContent = puntos;

    //se inicia solo cada x milisegundos(funcion q se ejecuta, y cada cuanto)
    timer_bola = setInterval(mover_bola_rnd, 1000)
    timer_partida = setInterval(decrementar_tiempo, 1000)
});

bola.addEventListener('click', function(){ 
    if(partida_en_marcha)
    {
        //sumamos puntos, ++ delante de la variable para que sume antes de asignar
        puntoslbl.textContent = ++puntos
        mover_bola_rnd()
        clearInterval(timer_bola) //para que no se mueva sola
        timer_bola = setInterval(mover_bola_rnd, 1000) //vuelve a empezar el timer
    }
})

function acabar_partida()
{
    //anular los timers para que acaben los timers
    clearInterval(timer_bola)
    clearInterval(timer_partida)
    partida_en_marcha = false
    //comprobar si los puntos merecen estar en el ranking

                        //[para acceder a un objeto del array], y .puntos xq solo quiero comparar puntos
    if(puntos > records[records.length-1].puntos)
    {
        let nick = prompt('Has entrado en el ranking! Dinos tu nick:')
        //meter el nuevo record en el array
        records.push({nombre: nick, puntos: puntos})
        //ordenar el array de mayor a menor
        records.sort((a,b) =>  b.puntos -= a.puntos)
        //dejar solo los 5 primeros
        records.splice(5)
                            console.table(records) //-------------------------------> para ver la tabla en consola
        //actualizar la tabla de records
        mostrar_records()
    }

}
function decrementar_tiempo()
{
    segundero--
    tiempolbl.textContent = segundero
    if(segundero == 0)
    {
        acabar_partida();
    }
}
function mostrar_records(){
    
    cuerpoRecords.innerHTML = '' //vaciamos la tabla
    let posicion = 1
    records.forEach(r =>{
        //crear una fila TR
        let nuevoTR = document.createElement('TR')
        //crear 3 celdas TD
        let nuevoTD1 = document.createElement('TD')
        let nuevoTD2 = document.createElement('TD')
        let nuevoTD3 = document.createElement('TD')

        //rellenar las tres celdas
        nuevoTD1.textContent = posicion++
        nuevoTD2.textContent = r.nombre
        nuevoTD3.textContent = r.puntos
        //conectarlo todo al DOM
        nuevoTR.append(nuevoTD1, nuevoTD2, nuevoTD3)
        cuerpoRecords.append(nuevoTR)}
)}
function mover_bola_rnd()
{
    //EJE X
   let nuevo_left = Math.floor(Math.random()*(ANCHURA_TABLERO-DIAMETRO_BOLA)) 
   //EJE Y
   let nuevo_top = Math.floor(Math.random()*(ALTURA_TABLERO-DIAMETRO_BOLA)) 

   bola.style.left = nuevo_left + 'px';
   bola.style.top = nuevo_top + 'px';
}




