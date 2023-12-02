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
    }
    
    getYDepart(){
        for(let i = 0; i<this.getHauteur(); i++ ){
            for (let j = 0; j<this.getLargeur(); j++){
                if (this.terrain[i][j] === 7){
                    console.log(i);
                    return i;
                }
            }
        }
    }
    
    getXDepart(){
        for(let i = 0; i<this.getHauteur(); i++ ){
            for (let j = 0; j<this.getLargeur(); j++){
                if (this.terrain[i][j] === 7){
                    console.log(j);
                    return j;
                }
            }
        }
    }
}