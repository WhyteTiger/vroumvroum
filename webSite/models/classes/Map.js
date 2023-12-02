import {API} from "../API.js";
import {Tileset} from "./Tileset.js";

export class Map {
    
    tileset;
    terrain;
    rotate;
    
    constructor(circuitId) {
        
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
               const mapJsonData = data.tileSet;
               
               const mapData = JSON.parse(mapJsonData);
               
               this.tileset = new Tileset(mapData.tileset);
               this.terrain = mapData.circuit;
               this.rotate = mapData.rotation;
           })
           .catch(() => {
               console.log("Fetch failed");
           });
    };

    getHauteur () {
        return this.terrain.length;
    }

    getLargeur () {
        return this.terrain[0].length;
    }
    

    dessinerMap (context) {
        let i = 0, l = this.terrain.length;
        for (; i < l; i++) {
            const ligne = this.terrain[i];
            const angle = this.rotate[i];
            const y = i * 160;
            for (var j = 0, k = ligne.length; j < k; j++) {
                this.tileset.dessinerTile(ligne[j], context, j * 160, y, angle[j]);
            }
        }
    }
    

    isImagePresent (index) {
        // Remplacez 'carte' par le nom correct de votre propriété dans le fichier JSON
        return this.terrain[0][index] !== undefined;
    };
}