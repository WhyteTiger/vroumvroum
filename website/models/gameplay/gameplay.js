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

let map, mat, controllerCheckpoint, controller, canvas, ctx, circuitTileset, carTileSize, carTilePixelX, carTilePixelY, engine, timer, popUp, started;

window.onload = () => {

   if(localStorage.getItem('test') === 'true') {

      document.getElementById('aside-infos').classList.add('invisible');

      if(localStorage.getItem('personal') === 'true') mat = JSON.parse(localStorage.getItem('matrixPerso'));
      else mat = JSON.parse(localStorage.getItem('matrix'));

      // transformation to correct matrix for the Map
      let T = []
      let R = []

      for(let i = 0 ; i < 8 ; i++) {
         let tempT = []
         let tempR = []
         for(let j = 0 ; j < 12 ; j++) {
            tempT.push(mat[0][i*12 + j])
            tempR.push(mat[1][i*12 + j])
         }
         T.push(tempT)
         R.push(tempR)
      }

      map = new Map(new Tileset('circuit.png'), T, R);
               
      // fetching the kart anyway
      const dataKart = {
         playerIdIn: window.localStorage.getItem('playerId')
      };
      const params = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(dataKart)
      };
      console.log(params);
      
      fetch(API.getURLgetOwnKartByPlayerId(), params)
         .then((response) => response.json())
         .then((dataKart) => {
            controllerCheckpoint = new ControllerCheckpoint(map,1);
            const kart     = new Kart(3, dataKart.kartId-1, 0);
            
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

            popUp = new Alert("Testez le circuit !", "Start","choiceCircuit.html","type");
            popUp.alertStartCircuit("vous", "aucun");
            
            started = 0;
            // Attendre que l'image soit complètement chargée
            
            updateCar(); // Appel initial de la fonction updateCar
         })
         .catch((err) => {
            console.log("Fetch failed" + err);
         });





   } else if(localStorage.getItem('test') === 'false') {

      document.getElementById('aside-infos').classList.remove('invisible');

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
            var creatorTime     = dataCircuit.creatorTime;
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
                        let timer = new Timer();
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
                  console.log('dataMap : ' + dataMap)
                  console.log(dataMap)
                  map  = new Map(new Tileset("circuit.png"), dataMap.tileSet.circuit, dataMap.tileSet.rotation);
                  
                  const playerIdIn = window.localStorage.playerId;
                  
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
                        controllerCheckpoint = new ControllerCheckpoint(map,1);
                        const kart     = new Kart(3, dataKart.kartId-1, 0);
                        
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

                        popUp = new Alert(circuitName, "Start","choiceCircuit.html","type");
                        popUp.alertStartCircuit(creatorUsername, creatorTime);
                        
                        started = 0;
                        // Attendre que l'image soit complètement chargée
                        
                        updateCar(); // Appel initial de la fonction updateCar
                     });
               })
               .catch(() => {
                  console.log("Fetch failed 2 " + err);
               });
         });
   }
}

function updateCar() {
   console.log('updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
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
   let i = 0, l = map.getHauteur();
   for (; i < l; i++) {
      const ligne = map.terrain[i];
      const angle = map.rotate[i];
      const y = i * 160;
      
      let j = 0, k = ligne.length;
      for (; j < k; j++) {
         map.tileset.dessinerTile(ligne[j], ctx, j * 160, y, angle[j]);
      }
   }
   
   //Test de la couleur de la route sous chaque roue pour savoir si on passe sur un checkpoint
   if (started === 2) {
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-60,  engine.getCentreVehicule().getY()-115, 1, 1).data,engine.getCentreVehicule().getX()-60,  engine.getCentreVehicule().getY()-115);
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-60,  1, 1).data,engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-60);
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-60,  engine.getCentreVehicule().getY()-60,  1, 1).data,engine.getCentreVehicule().getX()-60,  engine.getCentreVehicule().getY()-60);
      controllerCheckpoint.checkRoue(ctx.getImageData(engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-115, 1, 1).data,engine.getCentreVehicule().getX()-115, engine.getCentreVehicule().getY()-115);
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
   if (controllerCheckpoint.fini === 0) {
      requestAnimationFrame(updateCar); // Appel récursif pour une animation fluide
   } else {
      console.log(timer.getElapsedTime());
      timer.stop();
      console.log("La partie est terminée");

      if(localStorage.getItem('test') === 'true') {
         const popUp = new Alert("Voulez vous sauvegarder votre circuit ?", "Sauvegarder", "createCircuit.html", 'save');
		   popUp.customAlert();
         
      } else if(localStorage.getItem('test') === 'false') {
         let popUpFin = new Alert("Bravo !", "Rejouer", "playCircuit.html" ,"type");
         popUpFin.alertEndCircuit("creator", timer.timeToString(timer.getElapsedTime()));
      }
   }
}

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/gameplayMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();