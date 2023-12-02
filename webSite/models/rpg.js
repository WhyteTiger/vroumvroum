import {Map} from "./classes/Map.js";
import {API} from "./API.js";
import {Tileset} from "./classes/Tileset.js";
import {Chargement} from "./classes/Chargement.js";
import {Maths} from "./classes/Maths.js";
import {ControllerDirection} from "../controllers/controllerDirection.js";

window.onload = function () {
    
    const circuitId = window.localStorage.circuitId;
    
    const url = API.getURLgetCircuitTileById();
    const data = {
        circuitIdIn: circuitId
    };
    console.log(data);
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    
    console.log(params);
    
    fetch(url, params)
       .then((response) => response.json())
       .then((data) => {
           console.log("data.tileset : " + data.tileSet + "\ndta.circuit : " + data.tileSet.circuit + "\ndata.rotation : " + data.tileSet.rotation);
           
           const tileset = new Tileset("circuit.png");
           console.log(tileset);
           const map = new Map(tileset, data.tileSet.circuit, data.tileSet.rotation);
           const car = new Chargement(tileset, 3, 8, 0);
           
           const canvas = document.getElementById('canvas');
           const ctx = canvas.getContext('2d');
           
           canvas.width = map.getLargeur() * 160;
           canvas.height = map.getHauteur() * 160;
          
          // Création d'une image pour le tileset
          const circuitTileset = new Image();
          
          // Définition du chemin de l'image
          circuitTileset.src = '../../assets/tilesets/circuit.png';
          
          // Attendre que l'image soit complètement chargée
          circuitTileset.onload = function () {
             
             function updateCar() {
                const carTileX = car.getColone(); // L'indice de la colonne de la voiture (commence à 0)
                const carTileY = car.getLigne(); // La voiture est à la quatrième ligne (commence à 0)
                const carTileSize = 160; // Taille de chaque tile en pixels
                const angleDegrees = car.getRotate();
                
                const carTilePixelX = carTileX * carTileSize;
                const carTilePixelY = carTileY * carTileSize;
                
                const angleRadians = Maths.degToRad(angleDegrees);
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas à chaque mise à jour
                
                // Dessine le circuit
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
                
                // Dessine la voiture
                ctx.save();
                const controller = new ControllerDirection();
                ctx.translate(controller.directionX + carTileSize / 4, controller.directionY + carTileSize / 4);
                ctx.rotate(angleRadians);
                ctx.drawImage(circuitTileset, carTilePixelX, carTilePixelY, carTileSize, carTileSize, -carTileSize / 4, -carTileSize / 4, carTileSize / 2, carTileSize / 2);
                ctx.restore();
                
                requestAnimationFrame(updateCar); // Appel récursif pour une animation fluide
             }
             
             updateCar(); // Appel initial de la fonction updateCar
          };
       })
       .catch(() => {
           console.log("Fetch failed");
       });
}

