
//COMO SOY LA VERGA PUDE REALIZAR ESTE HERMOSO Y FUNCIONAL SLIDE, QUE COMO LO HICE SE PREGUNTARA EL LECTOR, PUES DIOS HABLA A TRAVES DE MI, PRIMERO DEFINO LOS ARRAYS A USAR, IMAGENES Y TEXTOS Y DEMAS ELEMENTOS A USAR


var imagenes = ['recursos/articuloB.jpg','recursos/articuloA.jpg','recursos/articulo1.png', 'recursos/articulo2.jpg'];

var fechas = ['5 DE JUNIO DE 2020', '29 DE MAYO DE 2020', '28 DE FEBRERO DE 2019', '6 DE SEPTIEMBRE DE 2018'];

var autor = ['POR: DENYR MONTOYA CUELLAR', 'POR: DENYR MONTOYA CUELLAR', 'POR: DENYR MONTOYA CUELLAR', 'POR: LAURA MUNAR SÁNCHEZ'];

var textos = ["PERSONAS NATURALES QUE DEBEN DECLARAR RENTA ESTE AÑO POR LA VIGENCIA 2019", "CONTROL DE PROPIEDAD, PLANTA Y EQUIPO","ORIENTACIONES PARA ARCHIVO, GESTIÓN DOCUMENTAL, CORREO INSTITUCIONAL Y MANEJO DE CLAVES", "¿QUÉ DEBES PREGUNTAR Y ANALIZAR AL MOMENTO DE CONTRATAR UN EMPLEADO?"];

var links = ["declaracion-renta-de-2019.html","control-propiedad-planta-y-equipo.html","orientaciones-para-archivo-gestion-documental-correo-institucional-y-manejo-de-claves.html", "que-debes-preguntar-y-analizar-al-momento-de-contratar-un-empleado.html"];

//SEGUNDO CREO LA FUNCIÓN CARGA QUE SE EJECUTA EN EL HTML BODY CON ONLOAD (CARGA) Y DOY UN CONTEO DE 3 SEGUNDOS Y AUMENTO EL CONTADOR, CUANDO ESTE SUPERA EL MAXIMO DE ITEMS DE LOS ARRAY, SE REINICIA, CREANDO UN BUCLE INFINITO, GRACIAS DIOS POR MI MENTE.

var contS = 0;
var a = 0;
var crono;
s = document.getElementById("imagen");
t = document.getElementById("titular");
lt = document.getElementById("linkTitular")
f = document.getElementById('fechaTitular');
a = document.getElementById('autorTitular');
ad = document.getElementsByClassName("adelante");
atr = document.getElementsByClassName("atras");

function carga (){
    crono = window.setInterval(function (){
        if (contS == imagenes.length){
            contS = 0;
        }

        s.src = imagenes[contS];
        t.innerHTML = textos[contS];
        f.innerHTML = fechas[contS];
        a.innerHTML = autor[contS];
        lt.href = links[contS];
        /*console.log(contS);*/
        contS ++;
        
    }, 4000);   
}

function avanzaslide(n){

    clearInterval(crono);
    
    contS = contS + n;

    if(contS < 0){
        contS = imagenes.length - 1;
    }

    if (contS >= imagenes.length){
        contS = 0;
    }

    s.src = imagenes[contS];
    t.innerHTML = textos[contS];
    f.innerHTML = fechas[contS];
    a.innerHTML = autor[contS];
    lt.href = links[contS];
    /*console.log(contS);*/
    
    carga();

    console.log("para");
}

//Petición de contraseña para archivos privados

var estadoFormulario = document.querySelector("#estadoFormulario");
var enlace = document.querySelectorAll(".enlaceDocumento");


function stopEvent(e){
    e.preventDefault();
}

function abrirCerrar(n){
    if (n == 1000){
        estadoFormulario.className = "cerrarFormulario";
    } else{
        estadoFormulario.className = "formularioContainer";
        console.log(enlace[n]);
    }
    
}

function informacion(){
    pass = document.querySelector("#pass");
    console.log(pass.value);
    if (pass.value == 12345){
        estadoFormulario.className = "cerrarFormulario";
        console.log("funciona");
    } else{
        alert("Contraseña incorrecta");
    }
}

// cerrar publicidad

var publicidad = document.getElementById('publicidadCerrar');

function cerrarPublicidad(){
    publicidad.style.display = "none";
}


