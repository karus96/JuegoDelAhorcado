//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Variables
var _palabrasDelJuego= ["HOLA", "JUEGO", "ADIOS", "DRAGON", "AMOR", "APUY"];
var _palabraSecreta;
var _letrasUsadas= [];
var _letrasCorrectas= [];
var _conteo;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var _elJuegoComenzo = false;
var _pantalla;
var _pincel;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//posicion para dibujar
var x= 100;
var y= 100;
var colorHorca = "blue";
var colorJugador = "black";
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var visor = document.getElementById("div-cronometro");
//variables de inicio:
class Reloj {
  constructor(munutos, segundos) {
    this.minutos = munutos;
    this.segundos = segundos;
    }  
  }

var tiempoLimite= new Reloj(0,30); ;
var contador=0;
var jugadores = [];
var nombreDeJugadores =document.getElementById("jugadores_Nombres_listaJugadores");
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
elcrono=setInterval(Cronometro,1000);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function AgregarJugador(){
  jugadores.push(document.getElementsByClassName("jugadores_agregarJugador_input")[0].value);
  nombreDeJugadores.innerHTML="";
  jugadores.forEach(element => {
    nombreDeJugadores.innerHTML+="<li>"+element+"</li>"
  });
}  

function Cronometro() { 
  if(_elJuegoComenzo){
      contador--;
      sg = tiempoLimite.segundos+contador;
      mn = tiempoLimite.minutos;
      if(sg==0){
        contador=0;
        tiempoLimite.segundos=60;
        tiempoLimite.minutos--;   
      }
      if(tiempoLimite.minutos < 0){
        console.log("termino");
        contador=0;
        tiempoLimite.segundos=0;      
        sg=0;
        mn=0;
        for (let index = 0; index <8; index++) {
          _conteo=index;
          PreparaParaMatar();
          
        }
      }
    if (sg<10) { sg= "0" + sg;} 
    if (mn<10) { mn= "0" + mn;} 
    visor.innerHTML=mn+":"+sg;  
  }
 }

function ComenzarJuego(){    
    EscogerPalabraAleatoria();
    PrepararPantalla();
    visor.innerHTML="0"+tiempoLimite.minutos+":"+tiempoLimite.segundos;
    tiempoLimite = new Reloj(0,30);     
    
}
function PrepararPantalla(){
  var contenedorBTN = document.getElementById("div-btn");  
  contenedorBTN.innerHTML=
  "<button id='btn-primario' onclick= 'ComenzarJuego()'><label id='txt-btn-primario'>Nuevo Juego</label></button>"+
  "<button id='btn-desisitir' onclick= 'RegresarAlInicio()'><label id='txt-btn-secundario'>Desisitir</label></button>";
  var lienzo = document.getElementById("div-ahorcado");  

  lienzo.innerHTML=
  "<canvas width='300' height='400'></canvas>"+
  "<div id='div-mensaje' class = 'txt-GameOver'></div>";  
}
function RegresarAlInicio(){  
  var lienzo = document.getElementById("div-ahorcado");  
  lienzo.innerHTML='';
  var contenedorBTN = document.getElementById("div-btn");  
  contenedorBTN.innerHTML=
  "<button id='btn-primario' onclick= 'PrepararPantalla()'><label id='txt-btn-primario'>Iniciar Juego</label></button>";
  var contenedorBTN = document.getElementById("div-letras");  
  contenedorBTN.innerHTML='';
  _elJuegoComenzo=false;  
}

function EscogerPalabraAleatoria(){
    _letrasCorrectas= [];
    _letrasUsadas= []; 
    var posicion= ObtenerEnteroAleatorio(0,_palabrasDelJuego.length);
    _palabraSecreta = _palabrasDelJuego[posicion];
    console.log("//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("El juego comienza");
    console.log("La palabra secreta ha sido escogida");    
    _palabraSecreta = _palabrasDelJuego[posicion];
    console.log("La palabra secreta es "+_palabraSecreta );
    _elJuegoComenzo=true;      
    CrearCamposParaLaPalabraSecreta();
    _conteo=0;       
}
function ObtenerEnteroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
function onKeyDownHandler(event) {
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Detecta la tecla presionada y la almacena si no existe y la muestra
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Para que funcione en todos los navegadores
    var codigo = event.which || event.keyCode;
    if(codigo >= 65 && codigo <= 90 && _elJuegoComenzo){      
      var letra  = String.fromCharCode(codigo);             
      var existe= _letrasUsadas.find(element => element == letra);            
      if(existe == undefined){
        //Agremgamos letra usada
        _letrasUsadas.push(letra);
        //revisamos si es de la palabra secreta;
        existe = _palabraSecreta.search(letra);
          if(existe != -1){
            DibujarLetraCorrecta(letra,existe)
            _letrasCorrectas.push(letra);
            if(_letrasCorrectas.length==_palabraSecreta.length){
              MensajeHasGanado();
              _elJuegoComenzo=false;
            }
          }else{
            DibujarLetraIncorrecta(letra); 
            _conteo++;
            PreparaParaMatar();           
          }   
      }      
    }
  }
  function DibujarLetraCorrecta(letra, index){
    console.log("Letra correcta");
    document.getElementById("div-letra-"+ index).innerHTML = letra;
  }
  function DibujarLetraIncorrecta(letra){
    console.log("Letra incorrecta");
    document.getElementById("txt-incorrecto").innerHTML += letra;   
  }
  function CrearCamposParaLaPalabraSecreta(){
    var contenedorDeLetras = document.getElementById("div-letras");  
    contenedorDeLetras.innerHTML="";
    for (let index = 0; index < _palabraSecreta.length; index++) {
      contenedorDeLetras.innerHTML += 
      "<div id='div-contenedor'>"+
          "<div id='div-letra-"+index+"' class ='txt-Correcto'></div>" +
          " <div id='div-linea' class ='txt-Correcto'></div>" +
      "</div>";
    }
    contenedorDeLetras.innerHTML += "<br><div id ='txt-incorrecto'></div>"  
  }
  function MensajeHasGanado(){
    var contenedorMensjae = document.getElementById("div-mensaje");  
    contenedorMensjae.innerHTML +="Has Ganado!";
    contenedorMensjae.style.color="green"; 
  } 
  function MensajeHasMuerto(){
    var contenedorMensjae = document.getElementById("div-mensaje");  
    contenedorMensjae.innerHTML ="Has Muerto!";
    contenedorMensjae.style.color="red";
  } 
  function PreparaParaMatar(){    
    switch (_conteo) {
      case 1:
        DibujarHorca();        
        break;
     case 2:
        DibujarCabeza();        
        break;
     case 3:
        DibujarTronco();        
        break;
      case 4:
        DibujarBrazoDerecho();           
        break;
      case 5:
        DibujarBrazoIzquierdo();        
        break;
      case 6:
        DibujarPiernaDerecha();        
        break;
      case 7:
        DibujarPiernaIzquierda(); 
        console.log("Has muerto!!!"); 
        MensajeHasMuerto();  
        _elJuegoComenzo=false;    
        break;
    }    
  }
  function DibujarHorca(){
    //600 800     
  
    //palo principal
    DibujarRectangulo(x,y,5,200,colorHorca)
    //base
    DibujarRectangulo(x-50,y+200,200,5,colorHorca)
    //palo donde va la cuerda
    DibujarRectangulo(x,y,150,5,colorHorca)
    //cuerda
    DibujarRectangulo(x+150,y,5,50,colorHorca)
    DibujarCirculo(x+150,y+75,30,colorHorca)
    DibujarCirculo(x+150,y+75,25,"white")
  }
  function DibujarCabeza(){
    DibujarCirculo(x+150,y+75,25,colorJugador)
    DibujarCirculo(x+150,y+75,20,"white")
  }  
  function DibujarTronco(){
    DibujarRectangulo(x+150,y+100,5,50,colorJugador)
  }  
  function DibujarPiernaIzquierda(){
    var xFinal=1;
    var yFinal=1;
    for (let index = 0; index < 30; index++) {
      DibujarRectangulo(x+152-xFinal,y+150-yFinal,5,5,colorJugador);    
      xFinal++;
      yFinal--;
    }
  }  
  function DibujarPiernaDerecha(){
    var xFinal=1;
    var yFinal=1;
    for (let index = 0; index < 30; index++) {
      DibujarRectangulo(x+152-xFinal,y+150-yFinal,5,5,colorJugador);    
      xFinal--;
      yFinal--;
    }
  } 
  function DibujarBrazoIzquierdo(){
    var xFinal=1;
    var yFinal=1;
    for (let index = 0; index < 30; index++) {
      DibujarRectangulo(x+122-xFinal,y+145-yFinal,5,5,colorJugador);    
      xFinal--;
      yFinal++;
    }
  }  
  function DibujarBrazoDerecho(){
    var xFinal=1;
    var yFinal=1;
    for (let index = 0; index < 30; index++) {
      DibujarRectangulo(x+152-xFinal,y+118-yFinal,5,5,colorJugador);    
      xFinal--;
      yFinal--;
    }
    
  }
  function DibujarRectangulo(x, y, base, altura, color) {
    _pantalla = document.querySelector("canvas");
    _pincel = _pantalla.getContext("2d");
    _pincel.fillStyle = color;
    _pincel.fillRect(x, y, base, altura);
    _pincel.strokeStyle = "black";
    _pincel.strokeRect(x, y, base, altura);
}
  function DibujarCirculo(x, y, radio, color) {
    _pantalla = document.querySelector("canvas");
    _pincel = _pantalla.getContext("2d");
    _pincel.fillStyle = color;
    _pincel.beginPath();
    _pincel.arc(x, y, radio, 0, 2 * Math.PI);
    _pincel.fill();
}
 


