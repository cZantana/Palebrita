// Variables para almacenar la posición y la dirección de la serpiente

var x = 150, y = 150, xSpeed = +30, ySpeed = 0;
var culebra = [[150,150],[120,150],[90,150],[60,150],[30,150]]
var posletrax, posletray
var recorpal = 0
var error = true
var puntaje = 0
var segundos = 0
var minutos = 0
var paso = true
var dis1x, dis1y, dis2x, dis2y, dis3x, dis3y, dis4x, dis4y, dis5x, dis5y
var arrdis = [[dis1x,dis1y],[dis2x,dis2y],[dis3x,dis3y],[dis4x,dis4y],[dis5x,dis5y]]
var letdis = []
var i=50;
var r = i;

do
    posletrax = Math.floor(Math.random() * 30) * 30;
while(posletrax >=690 || posletrax == 0)
do
    posletray = Math.floor(Math.random() * 30) * 30;
while(posletray >=540 || posletray == 0)


// Función para iniciar el juego
function iniciarJuego() {
  // Obtener una referencia al canvas
  var tablero = document.getElementById("tablero");
  var ctx = tablero.getContext("2d");
  var rellenar = document.getElementById("rellenar")
  var barrabaja = []

  document.getElementById("puntaje").innerHTML="Puntaje: "+puntaje.toString()+"&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Tiempo: "+ minutos +":" + segundos +"s"
  
  var i=50;
  for (element of culebra){
      ctx.fillStyle = "rgb("+i.toString()+","+(i+100).toString()+","+i.toString()+")";
      ctx.fillRect(element[0], element[1], 30, 30);
      i-=5;
    }
  // Establecer un intervalo de tiempo para actualizar el juego
  const texto = document.getElementById("word-input")
  
  const empezar = document.getElementById("start-button")
  
  empezar.addEventListener("click", intervalo);

  function cronometro()
  {
    segundos += 1;
    if (segundos == 60)
    {
        segundos = 0;
        minutos += 1;
    }
    document.getElementById("puntaje").innerHTML="Puntaje: "+puntaje.toString()+"&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Tiempo: "+ minutos +":" + segundos +"s"
  }

  function intervalo()
  {
    
    palabra = Array.from(texto.value.replaceAll(' ','_'))
    cantletras = palabra.length;
    for (i in palabra)
    {   console.log(i)
        console.log(palabra[i])
        if (palabra[i] == '_'){
            barrabaja.push("\xa0 ")  }
        else{
            barrabaja.push("_ ")}
    }
    distractores();
    
    rellenar.innerHTML=barrabaja.toString().replaceAll(',','')
    console.log(barrabaja)
    minutsini= new Date().getSeconds()
    minutos = new Date().getSeconds() - minutsini;
    

    setInterval(cronometro,1000)
    refreshinterval = setInterval(gameLoop, 100)}
    
  // Función para actualizar el juego
  function gameLoop() {
        refrescar = refreshinterval
      if (palabra.length == 0){
        alert("Juego terminado")
        palabra = [' ']
        document.location.reload();}
      x += xSpeed;
      y += ySpeed;
      // Limpiar el canvas
      ctx.clearRect(0, 0, tablero.width, tablero.height);
      
      // Dibujar la serpiente
      //colision de la serpiente consigomisma
      i=50;
      r = i;
      for (element of culebra){
        if(element[0] == x && element[1] == y){
            i-=100;
            r+=100;
            console.log("Colision consigo misma")
            error = true;
            puntaje-=5
        }     
      }
      
      colision();

      ctx.font="30px Arial";
      ctx.fillText(palabra[0],posletrax,posletray)

      for (element of culebra){
        ctx.fillStyle = "rgb("+r.toString()+","+(i+100).toString()+","+i.toString()+")";
        ctx.fillRect(element[0], element[1], 30, 30);
        i-=4;
      }
      for (dis in arrdis)
      {
        ctx.fillText(letdis[dis],arrdis[dis][0],arrdis[dis][1]);
      }
    
    }


  function colision(){
    if (x > 690)
    {x=0;}
    if (x < 0)
    {x=690;}
    if (y < 0)
    {y=540;}
    if (y > 540)
    {y=0;}

    
    culebra.unshift([x,y]);

    borrar = -1
    for (dis in arrdis)
    {
      //console.log("arrdis = ",arrdis[dis],"letra = ",letdis[dis])
      if (x == arrdis[dis][0] && y == arrdis[dis][1]-30)
      {
        i-=100;
        r+=100;
        console.log(letdis)
        console.log(arrdis)
        console.log(dis)
        borrar = dis
        console.log("Colision con letra erronea")
        error = true;
        puntaje-=5
        break
      }
    }
    if (borrar != -1)
    {
      console.log("borrar = ",borrar)
      arrdis.splice(borrar,1)
      letdis.splice(borrar,1)
      console.log(letdis)
      console.log(arrdis)
      console.log(borrar)
      borrar = -1
    }

    if (x == posletrax && y == posletray-30)
    {   
        do
            posletrax = Math.floor(Math.random() * 30) * 30;
        while(posletrax >=690 || posletrax == 0)
        do
            posletray = Math.floor(Math.random() * 30) * 30;
        while(posletray >=540 || posletray == 0)

        barrabaja[recorpal]=palabra[0]
        if (palabra[0] == '_')
            barrabaja[recorpal] = "\xa0 ";
        rellenar.innerHTML=barrabaja.toString().replaceAll(',','')
        palabra.shift()
        recorpal +=1
        puntaje +=15
        var dis1x, dis1y, dis2x, dis2y, dis3x, dis3y, dis4x, dis4y, dis5x, dis5y
        arrdis = [[dis1x,dis1y],[dis2x,dis2y],[dis3x,dis3y],[dis4x,dis4y],[dis5x,dis5y]]
        letdis = []
        distractores();
    }
    else
        culebra.pop();

  }

  function distractores(){
    console.log("entro a distractores")

    for (dis in arrdis)
    {
      do{
        do
            arrdis[dis][0] = Math.floor(Math.random() * 30) * 30;
        while(arrdis[dis][0] >=690 || arrdis[dis][0] == 0)

        do
            arrdis[dis][1] = Math.floor(Math.random() * 30) * 30;
        while(arrdis[dis][1] >=540 || arrdis[dis][1] == 0)
        
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        randchar = '';
        randchar += characters.charAt(Math.floor(Math.random() * characters.length));
        console.log(palabra[0])
      }
      while(randchar == palabra[0] );
      console.log(randchar)
      ctx.font="30px Arial";
      letdis.push(randchar);
      
    }

  }

  // Escuchar eventos de teclado para cambiar la dirección de la serpiente
  document.addEventListener("keydown", cambiarDireccion);
  
  function cambiarDireccion(event) {
    if (event.keyCode == 37 && xSpeed != 30) {
      xSpeed = -30;
      ySpeed = 0;
    }
    if (event.keyCode == 38 && ySpeed != 30) {
      xSpeed = 0;
      ySpeed = -30;
    }
    if (event.keyCode == 39 && xSpeed != -30) {
      xSpeed = 30;
      ySpeed = 0;
    }
    if (event.keyCode == 40 && ySpeed != -30) {
      xSpeed = 0;
      ySpeed = 30;
    }
  }
}