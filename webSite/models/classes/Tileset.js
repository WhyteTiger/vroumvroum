import {Maths} from "./Maths.js";

export class Tileset {
    
    image   = null;
    largeur = null;
    
    constructor(tilesetName) {
        
        console.log("hello 1");
        this.image = new Image();
        this.image.referenceDuTileset = this;
        console.log("hello 2");
        
        this.image.onload = function () {
            console.log("hello 3");
            
            this.referenceDuTileset.largeur = this.width / 160;
            console.log("12 : " + this.referenceDuTileset.largeur);
            if (!this.complete)
                throw new Error("Erreur de chargement du tileset nommé\"" + tilesetName + "\".");
        }
        this.image.src = "../../assets/tilesets/" + tilesetName;
    }
    
    dessinerTile(numero, context, xDestination, yDestination, degrees){
        
        console.log("hello 4");
        console.log("22 dessinerTile largeur : "+this.largeur);
        
        let xSourceEnTiles = numero % this.largeur;
        if (xSourceEnTiles === 0){
            xSourceEnTiles = this.largeur;
        }
        const ySourceEnTiles = Math.ceil(numero / this.largeur);
        
        const xSource = (xSourceEnTiles - 1) * 160;
        const ySource = (ySourceEnTiles - 1) * 160;
        
        context.save();
        context.translate(xDestination + 80, yDestination + 80);
        context.rotate(Maths.degToRad(degrees));
        
        context.drawImage(this.image, xSource, ySource, 160, 160, -80, -80, 160, 160);
        
        context.restore();
    }
    
    dessinerVoiture (context, xDestination, yDestination, degrees) {
        const numeroVoiture = 1;
        
        // Dessine la voiture
        this.dessinerTile(numeroVoiture, context, xDestination, yDestination, degrees);
    }
    
}



