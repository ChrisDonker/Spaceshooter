//Hier worden de andere scripts ingeladen en aan een naam gekoppeld om te gebruiken.
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import BulletController from "./BulletController.js";

//We stoppen de canvas & context in 2 variabelen om het een stuk overzichtelijker te maken in de toekomst.
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//We stoppen de moeilijkheidsgraad knoppen in variabelen, de hele lijst is ook een aparte variabele om mee te werken.
const buttonList = document.querySelector("#buttonlist");
const easyButton = document.querySelector("#easy");
const mediumButton = document.querySelector("#medium");
const hardButton = document.querySelector("#hard");

//Variabelen voor de headers.
const diffHeader = document.querySelector("#dHeader");
const scoreHeader = document.querySelector("#score");
const infoHeader = document.querySelector("#infoBlock");

//Het aanmaken van een nieuwe kogelbeheerder, en deze koppelen aan een variabel
const bulletController = new BulletController(canvas);

//We geven aan hoe breed en hoe groot het canvas zal zijn.
canvas.width = 550;
canvas.height = 600;


//Alle paden naar de audiofragmenten in een lijst.
const audioPaths = [
  "./Audio/BulletShot.mp3", 
  "./Audio/Firsthit.mp3",
  "./Audio/Leftbordercrossed.mp3",
  "./Audio/Leftcornerhit.mp3",
  "./Audio/rightborder.mp3",
  "./Audio/RightcornerHit.mp3",
  "./Audio/Secondhit.mp3"
]

//een lijst met kleuren die gelijk staan aan de waarde in punten
const valueColours = [
  "blue",
  "red",
  "gold"
]

//We maken een variabel aan waar we een nieuwe speler in stoppen.
//De speler krijgt een x & y positie, net als een manier om kogels af te schieten.
const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.3,
  bulletController
);

//We maken een lijst (array) genaamd enemies, waar we new enemies in aan maken
//Hier geven we alle parameters aan mee (x, y, colour, health, speed, value).
const enemies = [
  new Enemy(450, 100, valueColours[2], 2, 1, 5),
  new Enemy(300, 50, valueColours[2], 2, 1, 5),
  new Enemy(500, 90, valueColours[2], 2, 1, 5),
  new Enemy(150, 40, valueColours[1], 2, 1, 3),
  new Enemy(200, 30, valueColours[1], 2, 1, 3),
  new Enemy(250, 60, valueColours[2], 2, 1, 5),
  new Enemy(350, 80, valueColours[0], 2, 1, 1),
  new Enemy(100, 10, valueColours[0], 2, 1, 1),
  new Enemy(400, 70, valueColours[0], 2, 1, 1),
  new Enemy(50, 20, valueColours[0], 2, 1, 1),
];

//Het aanmaken van verschillende variabelen.
var playerDir = "";
var score = 0;
var diffSet = ""; 
var twoMinutes = 60 * 1;
var currTimer = 1;
var audioObject = new Audio();
var gameStarted = false;

//Aan het document voegen we twee luisterfuncties die kijken of een knop op het toetsenbord wordt ingedrukt
//of wordt los gelaten.
document.addEventListener('keydown', checkKeyDownCode);
document.addEventListener('keyup', checkKeyUpCode);

//De moeilijkheidsgraad knoppen krijgen functies gelinkt.
easyButton.addEventListener("click", setEasy);
mediumButton.addEventListener('click', setMedium);
hardButton.addEventListener('click', setHard);



//Deze functie zorgt voor het aanroepen van de verschillende geluidsfragmenten
function playSoundEffect(action){
  switch(action)
  {
    case "fired":
      audioObject.src = audioPaths[0];
      audioObject.play();
      break;

    case "enemyHitFirst":
      audioObject.src = audioPaths[1];
      audioObject.play();
      break;

    case "enemyHitSecond":
      audioObject.src = audioPaths[6];
      audioObject.play();
      break;

    case "leftBorderCrossed":
      audioObject.src = audioPaths[2];
      audioObject.play();
      break;

    case "rightBorderCrossed":
      audioObject.src = audioPaths[4];
      audioObject.play();
      break;

    case "enemyRightBorderHit":
      audioObject.src = audioPaths[5];
      audioObject.play();
      break;

    case "enemyLeftBorderHit":
      audioObject.src = audioPaths[3];
      audioObject.play();
      break;
  }
}


//Deze functie zorgt ervoor dat wanneer 'easy' gekozen word als moeilijkheidsgraad, er verschillende variabelen
//worden aangepast
function setEasy() {
  gameStarted = true;
  diffSet = "easy";
  player.delay = 10;
  player.speed = 4;
  changeEnemySpeed(0.8);
  buttonList.style.visibility = "hidden";
  startTimer(twoMinutes, diffHeader);
  infoHeader.textContent = "press left arrow or right arrow to move, press spacebar to shoot"
}

//Deze functie zorgt ervoor dat wanneer 'medium' gekozen word als moeilijkheidsgraad, er verschillende variabelen
//worden aangepast
function setMedium() {
  gameStarted = true;
  diffSet = "medium";
  player.delay = 20;
  player.speed = 3;
  changeEnemySpeed(1.2);
  buttonList.style.visibility = "hidden";
  startTimer(twoMinutes, diffHeader);
  infoHeader.textContent = "press left arrow or right arrow to move, press spacebar to shoot"
}

//Deze functie zorgt ervoor dat wanneer 'hard' gekozen word als moeilijkheidsgraad, er verschillende variabelen
//worden aangepast
function setHard() {
  gameStarted = true;
  diffSet = "hard";
  player.delay = 30;
  player.speed = 2;
  changeEnemySpeed(3);
  buttonList.style.visibility = "hidden";
  startTimer(twoMinutes, diffHeader);
  infoHeader.textContent = "press left arrow or right arrow to move, press spacebar to shoot"
}

//Deze functie zorgt ervoor dat alle enemies een nieuwe snelheid krijgen wanneer de moeilijkheidsgraad
//veranderd
function changeEnemySpeed(speed) {
  enemies.forEach(enemy => {
    if (enemy.speed < 0)
      enemy.speed = -speed;
    else if (enemy.speed > 0)
      enemy.speed = speed;
  });
}

//Deze functie wordt aangeroepen op het moment dat het spel moet stoppen,
//met als conditie een positieve of een negatieve afloop
function winOrLose(condition) {

  switch(condition)
  {
    case "positive":
      alert("Time's up, your score is:   " + score + "   on difficulty " + diffSet);
      location.reload();
      break;
    
    case "negative":
      alert("Enemy too close, your score is:   " + score + "   on difficulty " + diffSet);
      location.reload();
      break;
  }
}


//De functie die kijkt als een knop op het toetsenbord wordt ingedrukt
//als de knop overeenkomt met een naam zoals in de switch statement
//wordt de code uitgevoerd die daar bij hoort.
function checkKeyDownCode(e) {
  var keycode = e.code;

  switch (keycode) {
    case "ArrowLeft":
    case "KeyA":
      playerDir = "left";
      break;
    case "ArrowRight":
    case "KeyD":
      playerDir = "right";
      break;
    case "Space":
      player.shootPressed = true;
      break;
  }
}
//De functie die kijkt als een knop op het toetsenbord wordt losgelaten
//als de knop overeenkomt met een naam zoals in de switch statement
//wordt de code uitgevoerd die daar bij hoort.
function checkKeyUpCode(e) {
  var keycode = e.code;

  switch (keycode) {
    case "ArrowLeft":
    case "KeyA":
      playerDir = "";
      break;
    case "ArrowRight":
    case "KeyD":
      playerDir = "";
      break;
    case "Space":
      player.shootPressed = false;
      break;
  }
}

//Deze functie is het hart van de operatie, zonder deze functie beweegt er niks.
function gameLoop() {
  winOrLose();
  setCommonStyle();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  if (gameStarted) {

    bulletController.draw(ctx);
    player.draw(ctx);
    player.move(playerDir);
    player.shoot();
    enemies.forEach((enemy) => {
      if (bulletController.collideWith(enemy)) {
        if(enemy.health >= 1){
          playSoundEffect("enemyHitFirst");
        }
        
        if (enemy.health <= 0) {
          playSoundEffect("enemyHitSecond");
          const index = enemies.indexOf(enemy);
          enemies.splice(index, 1);
          score = score + enemy.value;
          enemies.push(new Enemy(150, enemy.y + 40, enemy.color, 2, enemy.speed, enemy.value));
          
        }
      } else {
        enemy.draw(ctx);
        enemy.moveX(ctx);
        enemy.AlternateMoveX(canvas);
      }
    });

  }

  enemies.forEach(enemy => {
    if (enemy.y >= 400) {
      winOrLose("negative");
    }
  });

  scoreHeader.textContent = "Score: " + score;

  if (player.x <= 0 - player.width){
    playSoundEffect("leftBorderCrossed");
    player.x = (canvas.width + player.width);
  } 
  else if (player.x >= canvas.width + player.width) {
    playSoundEffect("rightBorderCrossed");
    player.x = (0 - player.width);
    
  }
}

//functie de een aantal context variabelen goed neerzet
function setCommonStyle() {
  ctx.shadowColor = "#d53";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 15;
}



//Deze functie zorgt voor een timer die gaat aftellen, naast dit wordt er
//een parameter gevraagd waar we in de html de tijd ook daadwerkelijk laten zien.
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        winOrLose("positive");
        
      }
      console.log(currTimer);
  }, 1000);
}


setInterval(gameLoop, 1000 / 60);
  


