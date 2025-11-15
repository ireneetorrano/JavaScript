                    //FICHA 1/2 HECHA
                    
//Ejercicios muy sencillos sobre arrays.
/*1. Usando un bucle, rellena un array con los números del 1 al 10.*/
    
    let num=[]
    for(let i=1; i<=10;i++)
        num.push({valro:1})
    console.log(nums)

//-----------------------------------------------------------------------------------------------------------------------------//

/*2. Usando un bucle, rellena un array con 10 números aleatorios.*/
    
    let nums = []
    for(let i =1; i <=10;i++)
        nums.push(Math.floor(Math.random()*10+1))
    console.log(nums)

//-----------------------------------------------------------------------------------------------------------------------------//

/*3. Crea una copia del array anterior.*/
    
    let copia  = nums.slice()       //COPIA SUPERFICIAL
    console.log(copia)

    num[4].valor = 999
    console.log("num: ", nums)
    console.log("copia: ", copia)

    let copia2 = JSON.parse(JSON.stringify(nums))  //COPIA PROFUNDA
    console.log("copia2:", copia2)

    nums[4].valor = 999
//-----------------------------------------------------------------------------------------------------------------------------//

/*4. Ordena de mayor a menor el array de números aleatorios.*/
    nums.sort((a,b)=>
    {
        if(a < b)
            return 1
        else
            return -1
    })

//-----------------------------------------------------------------------------------------------------------------------------//

/*5. Crea un array con 6 nombres de personas y ordénalo alfabéticamente*/
    let mitad1 = ["cara", "boca", "cuello", "ojos"]
    let mitad2 = ["pera", "manzana ", "platano", "mango"]

    let nombres = []
    for(let i =1; i <=6;i++)
    {
        let m1 =mitad1[Math.floor(Math.random()*4)]
        let m2 =mitad2[Math.floor(Math.random()*4)]
        nombres.push(m1+m2)
    }
    console.log(nombre)
    nombres.sort((a,b) =>{
        if(b.toLowerCase() < a.toLowerCase())
            return -1
        else
            return 1
    })

//-----------------------------------------------------------------------------------------------------------------------------//

/*6. Crea una función que recibe un array de números como parámetro y devuelve un
nuevo array donde cada elemento original ha sido multiplicado por 2. Intenta
resolverlo de la manera clásica (bucle) y con la nueva función “map” de arrays.*/

    let numeros= [10,20,30]
    function x2(array)
    {
        let doble = []

        array.array.forEach(n => doble.push(n*2));
        return doble;
    }

    console.log("numeros: ", numeros)
    console.log("doble: ", doblar(numeros))

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡
   
    let nums= [10,20,30]
    console.log(nums.map(n =>n*2))  //MAP CREA UN  NUEVO ARRAY

//-----------------------------------------------------------------------------------------------------------------------------//

// 7. EJERCICIO SOBRE ARRAYS. ------------> SPLICE(INTRODUCIR EN UNA POSICION INDICADA UN NUEVO ELEMENTO O REMPLAZAR EN EL ARRAY)

    // • Declara un array que vamos a llamar “clasificaciones” con los siguientes valores:
    // Ana, Oswaldo, Raúl, Celia, María, Antonio (vamos a suponer que es el orden de
    // clasificación de un concurso, en un momento dado).
        let clasificaciones = ["Ana", "Oswaldo", "Raúl", "Celia", "María", "Antonio"]

    // • Imprime la clasificación actual.
        console.log(clasificaciones)

    // El concurso continúa y se van modifican esas posiciones anteriores. Debemos
    // cambiar en el array:
    // • Celia adelanta a Raúl.
        clasificaciones.splice(2,2,clasificaciones[3], clasificaciones[2])

        console.log(clasificaciones)
    //  Otra forma de hacerlo:
        clasificaciones.splice(2,1,"Celia")
        clasificaciones.splice(3,1,"Raúl")
        console.log(clasificaciones)

    // • Antonio es descalificado y se elimina del concurso.
        clasificaciones.pop()
        console.log(clasificaciones)

    // • Detrás de Ana y antes de Oswaldo se clasifican dos nuevos concursantes:
    // Roberto y Amaya, en ese orden.
        clasificaciones.splice(1,0,"Roberto","Amaya")
        console.log(clasificaciones)

    // • Hay una nueva participante que pasa a encabezar la clasificación: Elena.
        clasificaciones.splice(0,0,"Elena")
        console.log(clasificaciones)

    // • Imprime la clasificación actualizada y comprueba que se ha hecho
    // correctamente
        console.log(clasificaciones)

    //ELINIMAR POR EL PRINCIPIO
        clasificaciones.shift()
        console.log(clasificaciones)
    
    //INTRODUCIR POR EL PRINCIPIO
        clasificaciones.unshift("Elena")
        console.log(clasificaciones)

//-----------------------------------------------------------------------------------------------------------------------------//

// 8. EJERCICIO SOBRE ARRAYS Y OBJETOS (opcionalmente clases).
    // • Inserta en un array 5 objetos diferentes siguiendo la estructura dada:
        // o fabricante: “Toyota”,
        // o modelo: “Auris”,
        // o precio: “22900”

    const coches = [
        { fabricante: "Toyota", modelo: "Corolla", precio: 22000 },
        { fabricante: "Tesla", modelo: "Model 3", precio: 42000 },
        { fabricante: "BMW", modelo: "X5", precio: 65000 },
        { fabricante: "Seat", modelo: "León", precio: 23000 },
        { fabricante: "Volkswagen", modelo: "Golf", precio: 27000 },
        { fabricante: "Tesla", modelo: "Model Y", precio: 48000 },
        { fabricante: "BMW", modelo: "Serie 3", precio: 47000 },
        { fabricante: "BMW", modelo: "X5", precio: 65000 },
        { fabricante: "Mercedes-Benz", modelo: "Clase A", precio: 36000 },
        { fabricante: "Mercedes-Benz", modelo: "GLC", precio: 58000 },
        { fabricante: "Audi", modelo: "A3", precio: 35000 },
    ];
    // • Ordena y muestra en pantalla por precio descendente.

        coches.sort((a,b) =>{
            if(a.precio > b.precio)
                return -1
            else
                return 1
        })
        console.log(coches);

    // • Ordena y muestra en pantalla por fabricante. ORDEN ALFABETICO, 
    // Ya que se basa en el codigo ascii es mayor aquella letra que tiene numero mas grande, es decir esta mas atras alfabeticamente
    //por lo que si a es menor que b significa q la letra esta antes en el abecedario
        coches.sort((a,b)=>{
            if(a.fabricante < b.fabricante)
                return -1
            else
                return 1
        })

    // • Filtra y muestra en pantalla aquellos que sean de 1 fabricante dado.
        let fabricantes = coches.map(c => c.fabricante)
        console.log(fabricantes)

    //b) eliminar los duplicados 
        //SET NO PERMITE VALORES DUPLICADOS
        let conjunto = new Set(fabricantes)
        console.log(conjunto)

        //CONVERTIR SET A ARRAY
        //1. opcion 1
        fabricantes =[... new Set(fabricantes)]
        console.log(fabricantes)
        
        //2. opcion 2
        fabricantes  = Array.from(conjunto)
        console.log(fabricantes)

        

    // • Filtra y muestra en pantalla aquellos que superen los 20000 euros.
        let filtrado = coches.filter(c => c.precio < 40000)
        console.log(filtrado)
    
    // • Filtrar entre 30000 y 45000
        let filtrados = coches.filter(c => c.precio >= 30000 && c.precio <= 45000)
        console.log(filtrados)

//-----------------------------------------------------------------------------------------------------------------------------//

// 9. CALCULAR LA SUMA DE TODOS LOS ELEMENTOS DE UN ARRAY USANDO REDUCE
    let numeros2 = [10,20,30,40,50]
    
    let suma2 = numeros2.reduce((suma, i) => suma + i)
    console.log("suma reducida: ", suma2)
    
    let suma = 0
    for(let i =0; i < numeros2.length; i++)
        suma += numeros2[i]
    console.log("suma bucle: ", suma)
