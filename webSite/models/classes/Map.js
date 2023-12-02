import {API} from "../API.js";
import {Tileset} from "./Tileset.js";

export class Map {
    
    tileset = null;
    terrain = null;
    rotate  = null;
    
    constructor(tileset, terrain, rotate) {
        this.tileset = tileset;
        this.terrain = terrain;
        this.rotate  = rotate;
    };

    getHauteur () {
        console.log("getHauteur "+this.terrain);
        return this.terrain.length;
    }

    getLargeur () {
        console.log("getLargeur "+this.terrain);
        return this.terrain[0].length;
    }
    

    dessinerMap (context) {
        console.log("dessin map "+this.terrain);
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
        console.log("isImagePresent "+this.terrain);
        // Remplacez 'carte' par le nom correct de votre propriété dans le fichier JSON
        return this.terrain[0][index] !== undefined;
    };
}