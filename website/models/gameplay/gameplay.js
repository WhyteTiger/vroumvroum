// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { Map }                  from "../entities/Map.js";
import { API }                  from "../API.js";
import { Tileset }              from "../entities/Tileset.js";
import { Kart }                 from "../entities/Kart.js";
import { Maths }                from "./Maths.js";
import { ControllerDirection }  from "../../controllers/gameplay/controllerDirection.js";
import { MoteurPhysique }       from "./MoteurPhysique.js";
import { Point }                from "../entities/Point.js";
import { ControllerCheckpoint } from "../../controllers/gameplay/controllerCheckpoint.js";
import { Timer }                from "../entities/Timer.js";
import { Alert }                from "../entities/Alert.js";
import { Circuits }             from "../entities/Circuits.js";
let creatorTime, map, controllerCheckpoint, controller, canvas, ctx, circuitTileset, carTileSize, carTilePixelX, carTilePixelY, engine, timer, popUp, started, circuitBackGround,tickRate, lastFrameTime;

function drawCircuit(map) {
   if (circuitBackGround === undefined) {
      
      let i = 0, l = map.getHauteur();
      for (; i < l; i++) {
         const row   = map.terrain[i];
         const angle = map.rotate[i];
         
         const y = i * 160;
         
         let j = 0, k = row.length;
         for (; j < k; j++) {
            map.tileset.dessinerTile(row[j], ctx, j * 160, y, angle[j]);
         }
      }
      circuitBackGround = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
   } else {
      ctx.putImageData(circuitBackGround, 0, 0);
   }
}

window.onload = () => {
   console.log("LOADING page");
   circuitBackGround = undefined;
   
   const audio = document.createElement("audio");
   audio.volume   = 0.0312;
   audio.autoplay = true;
   audio.loop     = true;
   
   const circuitId = localStorage.circuitId;
   
   const circuit = Circuits.get(circuitId);
   
   let matrix;
   const isVerifying = localStorage.getItem("verifying");
   if (isVerifying === "true") {
      localStorage.getItem('modify') === 'true' ? matrix = JSON.parse(localStorage.getItem('matrixModify')) : matrix = JSON.parse(localStorage.getItem('matrix'));
   } else {
      matrix = circuit.getMatrix();
   }
   
   const terrain = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
   ];
   const rotate = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
   ];
   
   let columnCounter, rowCounter = -1, len = matrix[0].length;
   
   for (let matrixCurrentIndex = 0; matrixCurrentIndex < len; matrixCurrentIndex++) {
      
      if (matrixCurrentIndex%12 === 0) rowCounter += 1;
      columnCounter = matrixCurrentIndex - 12*rowCounter;
      
      terrain[rowCounter][columnCounter] = matrix[0][matrixCurrentIndex];
      rotate[rowCounter][columnCounter]  = matrix[1][matrixCurrentIndex];
   }
   
   if (isVerifying === "false") {
      
      audio.src = "../../assets/soundtrack/gameplayMusic.mp3";
      audio.play();
      
      const circuitName     = circuit.circuitName;
      const creatorUsername = circuit.creatorName;
      const circuitScore    = circuit.circuitScore
      creatorTime           = circuit.creatorTime;
      
      document.getElementById("circuitName").innerText  =                       circuitName;
      document.getElementById("score").innerText        = "Score : "+           circuitScore;
      document.getElementById("creatorName").innerText  = "Créateur : "+        creatorUsername;
      document.getElementById("creatorScore").innerText = "Médaille auteur : "+ creatorTime;
      
      // to manage the 5 (or less) best scores
      const leaderBoard = circuit.leaderBoard;
      if(leaderBoard[0] === null) {
         document.querySelector("#leaderboardPlayers").textContent = "Aucun joueur n'a encore joué à ce circuit. Soyez le premier !";
      } else {
         document.querySelector("#leaderboardPlayers").textContent = "";
         for (let i = 0; i < 5; i++) {
            
            if (leaderBoard[2*i] !== undefined) {
               const leaderboardPlayer = document.getElementById("leaderboardPlayers");
               const player = document.createElement("p");
               timer = new Timer();
               player.innerText = leaderBoard[2*i] +" : "+ timer.timeToString(leaderBoard[2*i+1]);
               leaderboardPlayer.appendChild(player);
            } else {
               // to skip end of for loop
               i = 12;
            }
         }
      }
      
      
      console.log(terrain);
      console.log(rotate);
      console.log(terrain[0]);
      
      map  = new Map(new Tileset("circuit.png"), terrain, rotate);
      let nbTour       = circuit.getCircuitLaps();
      const playerIdIn = localStorage.playerId;
      
      const kartId = Number(localStorage.getItem("kartId"));
      
      init(kartId-1, nbTour);
      started = 0;
      
      popUp = new Alert(circuitName, "Start","choiceCircuit.html","type");
      popUp.alertStartCircuit(creatorUsername, timer.timeToString(creatorTime));
      
      setTimeout(() => {
         timer.start();
         
         setInterval(() => {timer.updateCompteur();}, 100);
         started = 2;
         
         updateCar();
      }, 100);
         
   } else if (isVerifying === "true") {
      document.getElementById('asideInfos').classList.add('invisible');
      
      console.log("LOADING circuit");
      
      audio.src = "../../assets/soundtrack/checkMusic.mp3";
      audio.play();
      
      map = new Map(new Tileset("circuit.png"), terrain, rotate);
      const nbTour = localStorage.getItem("circuitLaps");
      
      timer = new Timer();
      init(0, nbTour);
      
      setTimeout(() => {
         timer.start();
         
         setInterval(() => {timer.updateCompteur();}, 100);
         started = 2;
         
         updateCar();
      }, 100);
   }
};

function init(kartId, nbTour) {
   tickRate = 25;
   controllerCheckpoint = new ControllerCheckpoint(map, nbTour);
   const kart     = new Kart(3, kartId, 0);
   
   controller = new ControllerDirection();
   controller.init();
   
   canvas = document.getElementById('canvas');
   ctx    = canvas.getContext('2d',{willReadFrequently: true});
   
   canvas.width  = map.getLargeur() * 160;
   canvas.height = map.getHauteur() * 160;
   
   // Création d'une image pour le tileset
   circuitTileset = new Image();
   
   // Définition du chemin de l'image
   circuitTileset.src = '../../assets/tilesets/circuit.png';
   
   const carTileX = kart.getColone();
   const carTileY = kart.getLigne();
   carTileSize = 160;
   
   carTilePixelX = carTileX * carTileSize;
   carTilePixelY = carTileY * carTileSize;
   engine = new MoteurPhysique(new Point(controllerCheckpoint.getLastCheckpoint()[1]*160+160,controllerCheckpoint.getLastCheckpoint()[0]*160+160),tickRate,controllerCheckpoint.getOrientationLastCheckpoint());
   timer  = new Timer();
   controllerCheckpoint.updateCheckpoint();
	controllerCheckpoint.updateTour();
   lastFrameTime= 0;
}


function updateCar() {
   if (started === 0 && popUp.getIsButtonClicked() === 1) {
      started = 1;
   }
   if (started === 1 && popUp.getIsButtonClicked() === 1) {
      timer.start();
      setInterval(() => {timer.updateCompteur();}, 100);
      started = 2;
   }
   
   ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas à chaque mise à jour
   //dessin Circuit
   drawCircuit(map);
   
   //Test de la couleur de la route sous chaque roue pour savoir si on passe sur un checkpoint
   if (started === 2) {
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-60,  engine.getCentreVehicule().getY()-115, 1, 1).data,engine.getCentreVehicule().getX()-60,  engine.getCentreVehicule().getY()-115);
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-60,  1, 1).data,engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-60 );
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-60,  engine.getCentreVehicule().getY()-60,  1, 1).data,engine.getCentreVehicule().getX()-60,  engine.getCentreVehicule().getY()-60 );
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-115, 1, 1).data,engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-115);
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-87,  engine.getCentreVehicule().getY()-87,  1, 1).data,engine.getCentreVehicule().getX()-87,  engine.getCentreVehicule().getY()-87 );
      
      //calcul du temps de la dernière frame
      engine.setTickRate(tickRate/((timer.getElapsedTime()-lastFrameTime)/16.66));
      lastFrameTime = timer.getElapsedTime();

      //deplacement de la voiture
      engine.next(controller.up , controller.down, controller.getdirection(),ctx.getImageData(engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-115, 1, 1).data,ctx.getImageData(engine.getCentreVehicule().getX()-60, engine.getCentreVehicule().getY()-60, 1, 1).data,ctx.getImageData(engine.getCentreVehicule().getX()-60, engine.getCentreVehicule().getY()-115, 1, 1).data,ctx.getImageData(engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-60, 1, 1).data);

      // Si la voiture sort du circuit, on la replace au dernier checkpoint
      if (canvas.width+200 < engine.getCentreVehicule().getX()  || canvas.height+200 < engine.getCentreVehicule().getY() || 0 > engine.getCentreVehicule().getX() || 0 > engine.getCentreVehicule().getY()) {
         engine.resetCar(new Point(controllerCheckpoint.getLastCheckpoint()[1]*160+160,controllerCheckpoint.getLastCheckpoint()[0]*160+160),controllerCheckpoint.getOrientationLastCheckpoint());
      }
      
      // Dessine la voiture
      ctx.save();
      ctx.translate(engine.getCentreVehicule().getX()-carTileSize / 2, engine.getCentreVehicule().getY() - carTileSize / 2);
      ctx.rotate(Maths.degToRad(engine.getOrientationVehicule()));
      ctx.drawImage(circuitTileset, carTilePixelX, carTilePixelY, carTileSize, carTileSize, -carTileSize / 4, -carTileSize / 4, carTileSize / 2, carTileSize / 2);
      
      ctx.restore();
   }
   
   if (controllerCheckpoint.fini === 0) { //Si ce n'est pas fini
      requestAnimationFrame(updateCar); // Appel récursif pour une animation fluide
      
   } else if (localStorage.getItem("verifying") === "false") {
		let monTemps = timer.getElapsedTime();
      timer.stop();
		let popUpFin = new Alert("Bravo !", "Rejouer", "playCircuit.html" ,"type");
  
		let score = 0;
      let url = API.getURLBestScoreAndNote(); 
			const dataPlayer = {
				playerIdIn:  localStorage.playerId,
				circuitIdIn: localStorage.circuitId
			};
			const params = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataPlayer)
			};
      
      let playerTime = dataPlayer.playerScore;
      //Si le joueur a un meilleurs temps ou si il n'a pas de temps
      if (playerTime > monTemps || playerTime === null) {
         score = 1;
         let url = API.getURLupdateBestTimeOfCircuitByPlayerId();
         const dataPlayer = {
            playerIdIn :    localStorage.playerId,
            circuitIdIn :   localStorage.circuitId,
            newBestTimeIn : monTemps
         };
         const params = {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(dataPlayer)
         };
         
         fetch(url, params)
            .then((response) => response.json())
            .then((dataPlayer) => {})
            .catch((err) => {
               console.error(err);
            });
      }
      if(monTemps < creatorTime){
         let coins = Number(localStorage.getItem("Coins"));
         coins += 1;
         localStorage.setItem("Coins", ""+coins);
      }
      popUpFin.alertEndCircuit(score, timer.timeToString(monTemps));

   } else if (localStorage.getItem("verifying") === "true") { //Si la vérif est finie
      timer.stop();
      const creatorTime = timer.getElapsedTime();
      
      localStorage.setItem("creatorTime", creatorTime);
      localStorage.setItem("isChecked", "true");
      localStorage.setItem("verifying", "false");

      location.href = "createCircuit.html";
   }
}

window.onunload = () => {
   circuitBackGround = undefined;
};
