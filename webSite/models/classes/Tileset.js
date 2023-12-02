export class Tileset {
    
    constructor(url){
        const tileset = this;
        // chargement image
        this.image = new Image();
        this.image.referenceDuTileset = tileset ;
        this.image.onload = function(){
            // Largeur du tileset en tiles
            this.referenceDuTileset.largeur = this.width/160;
            if(!this.complete)
                throw new Error("Erreur de chargement du tileset nommé\"" + url + "\".");
        }
        this.image.src = "../../assets/tilesets/" + url;
        console.log(this.image);
    }
    
    degToRad(degrees){
        return degrees * (Math.PI / 180);
    }
    
    dessinerTile(numero, context, xDestination, yDestination, degrees){
        
        let xSourceEnTiles = numero % this.largeur;
        if (xSourceEnTiles === 0){
            xSourceEnTiles = this.largeur;
        }
        const ySourceEnTiles = Math.ceil(numero / this.largeur);
        
        const xSource = (xSourceEnTiles - 1) * 160;
        const ySource = (ySourceEnTiles - 1) * 160;
        
        context.save();
        context.translate(xDestination + 80, yDestination + 80);
        context.rotate(this.degToRad(degrees));
        
        context.drawImage(this.image, xSource, ySource, 160, 160, -80, -80, 160, 160);
        
        context.restore();
    }
}



