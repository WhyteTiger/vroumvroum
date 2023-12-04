import {Map} from "../entities/Map.js";
import {API} from "../API.js";
import {Tileset} from "../entities/Tileset.js";
import {Kart} from "../entities/Kart.js";
import {Maths} from "./Maths.js";
import {ControllerDirection} from "../../controllers/gameplay/controllerDirection.js";
import {MoteurPhysique} from "./MoteurPhysique.js";
import {Point} from "../entities/Point.js";
import {Color} from "../entities/Color.js";


window.onload = function () {
    
    const circuitId = window.localStorage.circuitId;
    
    const url = API.getURLgetCircuitTileById();
    const data = {
        circuitIdIn: circuitId
    };
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
           
           const map  = new Map(new Tileset("circuit.png"), data.tileSet.circuit, data.tileSet.rotation);
           const kart = new Kart(3, 8, 0);
           const controller = new ControllerDirection();

           const canvas = document.getElementById('canvas');
           const ctx = canvas.getContext('2d');
           
           canvas.width  = map.getLargeur() * 160;
           canvas.height = map.getHauteur() * 160;
          
          // Création d'une image pour le tileset
          const circuitTileset = new Image();
          
          // Définition du chemin de l'image
          circuitTileset.src = '../../assets/tilesets/circuit.png';
          const engine = new MoteurPhysique(new Point(canvas.width/2,canvas.height/2),20,0);
           const carTileX             = kart.getColone();
           const carTileY             = kart.getLigne();
           const carTileSize = 160;
           const angleDegrees         = kart.getRotate();

           const carTilePixelX = carTileX * carTileSize;
           const carTilePixelY = carTileY * carTileSize;
          // Attendre que l'image soit complètement chargée
          circuitTileset.onload = function () {

             function updateCar() {


                const angleRadians = Maths.degToRad(angleDegrees);
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
                engine.next(controller.up , controller.down, controller.getdirection(),new Color("545454",33,33,33),new Color("545454",33,33,33),new Color("545454",33,33,33),new Color("545454",33,33,33));

                // Dessine la voiture
                ctx.save();
                ctx.translate(engine.centreVehicule.getX-carTileSize / 4, engine.centreVehicule.getY - carTileSize / 4);
                ctx.rotate(Maths.degToRad(engine.orientationVehicule));
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

