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
    
    dessinerMap(context){
        console.log("dessiner map -1 / 3");
        let i = 0, l = this.terrain.length;
        for( ; i < l ; i++) {
            const ligne = this.terrain[i];
            const angle = this.rotate[i];
            const y = i * 160;
            let j = 0, k = ligne.length;
            for(; j<k; j++){
                this.tileset.dessinerTile(ligne[j], context, j*160, y, angle[j]);
                if (this.isImagePresent(j)) {
                    this.tileset.dessinerVoiture(context, j*160, y, angle[j]);
                }
            }
        }
    }
    
    dessinerKart(context, carte, rotation){
        const ligne = carte[0];
        const angle = rotation[0];
        
        for(let j = 0, k = ligne.length; j<k; j++){
            let y = j*160;
            
            this.tileset.dessinerTile(ligne[j], context, j*160, 0, angle[j]);
        }
    }
    
    
    
    isImagePresent (index) {
        return this.terrain[0][index] !== undefined;
    }
    
    getYDepart(){
        for(let i = 0; i<this.getHauteur(); i++ ){
            for (let j = 0; j<this.getLargeur(); j++){
                if (this.terrain[i][j] === 7){
                    return i;
                }
            }
        }
    }
    
    getXDepart(){
        for(let i = 0; i<this.getHauteur(); i++ ){
            for (let j = 0; j<this.getLargeur(); j++){
                if (this.terrain[i][j] === 7){
                    return j;
                }
            }
        }
    }
}