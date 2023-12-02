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
            let j = 0, k = ligne.length;
            for (; j < k; j++) {
                this.tileset.dessinerTile(ligne[j], context, j * 160, y, angle[j]);
            }
        }
    }
    

    isImagePresent (index) {
        // Remplacez 'carte' par le nom correct de votre propriété dans le fichier JSON
        return this.terrain[0][index] !== undefined;
    };
}