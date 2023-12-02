function Tileset(url){
    var tileset = this;
    // chargement image
    this.image = new Image();
    this.image.referenceDuTileset = tileset ;
    this.image.onload = function(){
        // Largeur du tileset en tiles
        this.referenceDuTileset.largeur = this.width/160; // le 32 sera à remplacer par la taille de nos tiles soit 160
        if(!this.complete)
            throw new Error("Erreur de chargement du tileset nommé\"" + url + "\".");
    }
    this.image.src = "../../assets/tilesets/" + url;
}

function degToRad(degrees){
    return degrees * (Math.PI / 180);
}


Tileset.prototype.dessinerTile = function (numero, context, xDestination, yDestination, degrees){
    let xSourceEnTiles = numero % this.largeur;
    if (xSourceEnTiles === 0){
        xSourceEnTiles = this.largeur;
    }
    var ySourceEnTiles = Math.ceil(numero / this.largeur);

    var xSource = (xSourceEnTiles - 1) * 160;
    var ySource = (ySourceEnTiles - 1) * 160;

    context.save();
    context.translate(xDestination + 80, yDestination + 80);
    context.rotate(degToRad(degrees));


    context.drawImage(this.image, xSource, ySource, 160, 160, -80, -80, 160, 160);

    context.restore();
}

