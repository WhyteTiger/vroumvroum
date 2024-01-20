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

let playerIdIn,creatorTime,circuitId ,map, controllerCheckpoint, controller, canvas, ctx, circuitTileset, carTileSize, carTilePixelX, carTilePixelY, engine, timer, popUp, started, circuitBackGround;

function drawCircuit(map) {
   if (circuitBackGround === undefined) {
      
      let i = 0, l = map.getHauteur();
      for (; i < l; i++) {
         const row = map.terrain[i];
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
   
   const audio = document.createElement("audio");
   audio.volume   = 0.0312;
   audio.autoplay = true;
   audio.loop     = true;
   
   console.log("localStorage.getItem(\"personal\") : "+ localStorage.getItem("personal"));
   
   if (localStorage.getItem("personal") === "false") {
      console.log("localStorage.getItem(\"personal\") === false START");
      
      audio.src = "../../assets/soundtrack/gameplayMusic.mp3";
      audio.play();
      
      const circuitId = window.localStorage.circuitId;
      
      const url = API.getURLgetCircuitInformation();
      const dataCircuit = {
         circuitIdIn: circuitId
      };
      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(dataCircuit)
      };
      
      console.log(params);
      
      fetch(url, params)
         .then((response) => response.json())
         .then((dataCircuit) => {
            
            var circuitName     = dataCircuit.circuitName;
            var creatorUsername = dataCircuit.creatorUsername;
            creatorTime     = dataCircuit.creatorTime;
            var circuitScore    = dataCircuit.circuitScore;
            
            console.log(circuitName + " " + creatorUsername + " " + creatorTime + " " + circuitScore);
            document.getElementById("circuit-name").innerText  =                       dataCircuit.circuitName;
            document.getElementById("score").innerText         = "Score : "+           dataCircuit.circuitScore;
            document.getElementById("creator-name").innerText  = "Créateur : "+        dataCircuit.creatorUsername;
            document.getElementById("creator-score").innerText = "Médaille auteur : "+ dataCircuit.creatorTime;
            
            // to manage the 5 (or less) best scores
            const leaderBoard = dataCircuit.leaderBoard;
            if(leaderBoard[0] === null) {
               document.querySelector("#leaderboard-players").textContent = "Aucun joueur n'a encore joué à ce circuit. Soyez le premier !";
            } else {
               document.querySelector("#leaderboard-players").textContent = "";
               for (let i = 0; i < 5; i++) {
                  
                  if (leaderBoard[2*i] !== undefined) {
                     const leaderboardPlayer = document.getElementById("leaderboard-players");
                     const player = document.createElement("p");
                     timer = new Timer();
                     player.innerText = leaderBoard[2*i] + " : " + timer.timeToString(leaderBoard[2*i+1]);
                     leaderboardPlayer.appendChild(player);
                  } else {
                     // to skip end of for loop
                     i = 12;
                  }
               }
            }
            
            const url = API.getURLgetCircuitTileById();
            const dataMap = {
               circuitIdIn: circuitId
            };
            const params = {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(dataMap)
            };
            console.log(params);
            
            fetch(url, params)
               .then((response) => response.json())
               .then((dataMap) => {
                  console.log("***************************************************************************************************************");
                  console.log("dataMap.tileSet.circuit : "+ dataMap.tileSet.circuit +"   dataMap.tileSet.rotation : "+ dataMap.tileSet.rotation);
                  map  = new Map(new Tileset("circuit.png"), dataMap.tileSet.circuit, dataMap.tileSet.rotation);
						let nbTour = dataMap.laps;
                  const playerIdIn = localStorage.playerId;
                  
                  const url = API.getURLgetOwnKartByPlayerId();
                  const dataKart = {
                     playerIdIn: playerIdIn
                  };
                  const params = {
                     method: "POST",
                     headers: {
                        "Content-Type": "application/json",
                     },
                     body: JSON.stringify(dataKart)
                  };
                  console.log(params);
                  
                  fetch(url, params)
                     .then((response) => response.json())
                     .then((dataKart) => {
                        
                        init(dataKart.kartId-1, nbTour);
                        
                        started = 0;
                        
                        popUp = new Alert(circuitName, "Start","choiceCircuit.html","type");
                        popUp.alertStartCircuit(creatorUsername, creatorTime);
                        
                        updateCar(); // Appel initial de la fonction updateCar
                     });
               })
               .catch(() => {
                  console.log("Fetch failed");
               });
         });
      console.log("localStorage.getItem(\"personal\") === \"false\" END");
   } else {
      console.log("localStorage.getItem(\"personal\") === \"true\" START");
      
      audio.src = "../../assets/soundtrack/checkMusic.mp3";
      audio.play();
      
      const matrix = JSON.parse(localStorage.getItem("matrix"));
      const circuitTiles = [
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ];
      const orientationTiles = [
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
         
         circuitTiles[rowCounter][columnCounter]     = matrix[0][matrixCurrentIndex];
         orientationTiles[rowCounter][columnCounter] = matrix[1][matrixCurrentIndex];
      }
      
      console.log("=====================================================================================");
      let circuitTilesPrint     = "[\n";
      let orientationTilesPrint = "[\n";
      for (let i = 0; i < 8; i++) {
         circuitTilesPrint     += "  [";
         orientationTilesPrint += "  [";
         for (let j = 0; j < 12; j++) {
            circuitTilesPrint     += circuitTiles[i][j];
            orientationTilesPrint += orientationTiles[i][j];
            if (j < 11) {
               circuitTilesPrint     += ", ";
               orientationTilesPrint += ", ";
            }
         }
         circuitTilesPrint     += "]\n";
         orientationTilesPrint += "]\n";
      }
      circuitTilesPrint     += "\n]\n";
      orientationTilesPrint += "\n]\n";
      console.log("circuitTilesPrint : \n"+ circuitTilesPrint +"orientationTilesPrint : \n"+ orientationTilesPrint);
      console.log("=====================================================================================");
      
      map = new Map(new Tileset("circuit.png"), circuitTiles, orientationTiles);
      const nbTour = localStorage.getItem("circuitLaps");
      timer = new Timer();
      
      init(0, nbTour)
      
      timer.start();
      setInterval(() => {timer.updateCompteur();}, 100);
      started = 2;
      
      updateCar();
   }
}

function init(kartId, nbTour) {
   controllerCheckpoint = new ControllerCheckpoint(map,nbTour);
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
   
   //const angleDegrees = kart.getRotate();
   
   carTilePixelX = carTileX * carTileSize;
   carTilePixelY = carTileY * carTileSize;
   engine = new MoteurPhysique(new Point(controllerCheckpoint.getLastCheckpoint()[1]*160+160,controllerCheckpoint.getLastCheckpoint()[0]*160+160),20,controllerCheckpoint.getOrientationLastCheckpoint());
   timer  = new Timer();
   controllerCheckpoint.updateCheckpoint();
	controllerCheckpoint.updateTour();
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
   
   //const angleRadians = Maths.degToRad(angleDegrees);
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
      //deplacement de la voiture
      engine.next(controller.up , controller.down, controller.getdirection(),ctx.getImageData(engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-115, 1, 1).data,ctx.getImageData(engine.getCentreVehicule().getX()-60, engine.getCentreVehicule().getY()-60, 1, 1).data,ctx.getImageData(engine.getCentreVehicule().getX()-60, engine.getCentreVehicule().getY()-115, 1, 1).data,ctx.getImageData(engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-60, 1, 1).data);
      
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
      
   } else if (localStorage.getItem("personal") === "false") { //Si le jeu est fini
		let monTemps = timer.getElapsedTime();
      timer.stop();
      console.log(timer.timeToString(monTemps));
      console.log("La partie est terminée");
		let popUpFin = new Alert("Bravo !", "Rejouer", "playCircuit.html" ,"type");
		let score;
		let playerTime = localStorage.getItem("playerTime");
		if(playerTime > monTemps){
			score = 1;
			let url = API.getURLupdateBestTimeOfCircuitByPlayerId();
			const dataPlayer = {
				playerIdIn : playerIdIn,
				circuitIdIn : circuitId ,
				newBestTimeIn : monTemps
			};
			const params = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataPlayer)
			};
			console.log(params);
			
			fetch(url, params)
				.then((response) => response.json())
				.then((dataPlayer) => {
					console.log(dataPlayer.success);
				});
		}
		if(monTemps < creatorTime){
			score = 1;
			let url = API.getURLaddVroumCoinToPlayerId();
			const dataPlayer = {
				playerIdIn: playerIdIn
			};
			const params = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataPlayer)
			};
			console.log(params);
			
			fetch(url, params)
				.then((response) => response.json())
				.then((dataPlayer) => {
					console.log(dataPlayer.success);
				});
		}else{
			score = 0;
		}
		popUpFin.alertEndCircuit(score, timer.timeToString(monTemps));
		
   } else if (localStorage.getItem("personal") === "true") { //Si la vérif est finie
      timer.stop();
      const creatorTime = timer.getElapsedTime();
      console.log("creatorTime : "+ creatorTime);
      
      localStorage.setItem("creatorTime", creatorTime);
      localStorage.setItem("isChecked", "true");
      
      console.log("La vérif est terminée");
      location.href = "createCircuit.html";
   }
}

window.onunload = () => {
   circuitBackGround = undefined;
}