// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class Map {
    tileset = null;
    terrain = null;
    rotate  = null;
    
    constructor(tileset, terrain, rotate) {
        this.tileset = tileset;
        this.terrain = terrain;
        this.rotate  = rotate;
    }

    getHauteur () {
        return this.terrain.length;
    }
    getTileset () {
        return this.tileset;
    }
    getTerrain () {
        return this.terrain;
    }
    getLargeur () {
        return this.terrain[0].length;
    }
    getRotate () {
        return this.rotate;
    }
    
    dessinerMap(context){
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
            this.tileset.dessinerTile(ligne[j], context, j*160, 0, angle[j]);
        }
    }
    
    dessinerTuiles(ligne, angle, container, value, size) {

        if(value === undefined) value = 160;
        if(size  === undefined) size  = 160;
        
        for(let j = 0, k = ligne.length; j<k; j++){
            const div = document.createElement('div');
            div.setAttribute('name', ligne[j]);
            
            const miniCanvas = document.createElement('canvas');
            miniCanvas.setAttribute('class', 'tileCanvas');
            miniCanvas.width  = value;
            miniCanvas.height = value;
            
            this.tileset.dessinerTile(ligne[j], miniCanvas.getContext('2d'), 0, 0, angle[j], size);

            div.appendChild(miniCanvas);
            container.appendChild(div);
        }
    }

    replaceTiles(carte, rotation, container, size, matrix) {
        if (size === undefined) size = 160;

        if (carte.length !== 96 || rotation.length !== 96 || container.querySelectorAll('div').length !== 96) {
           return -12;
        }

        const cDivs = container.querySelectorAll('div');

        for (let i = 0; i < cDivs.length; i++) {
            switch (matrix[i]) {
                case 0 :
                    this.tileset.dessinerTile(carte[i], cDivs[i].firstChild.getContext('2d'), 0, 0, rotation[i], size);
                    break;
                case 90 :
                    this.tileset.dessinerTile(carte[i], cDivs[i].firstChild.getContext('2d'), -100, 0, rotation[i], size);
                    break;
                case 180 :
                    this.tileset.dessinerTile(carte[i], cDivs[i].firstChild.getContext('2d'), -100, -100, rotation[i], size);
                    break;
                case 270 :
                    this.tileset.dessinerTile(carte[i], cDivs[i].firstChild.getContext('2d'), 0, -100, rotation[i], size);
                    break;
                default :
                    break;
            }
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