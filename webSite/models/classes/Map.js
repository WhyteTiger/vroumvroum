// version exemple site

/*function Map(nom){
    // création de l'objet XmlHttpRequest
    var xhr = getXMLHttpRequest();

    // chargement fichier JSON
    xhr.open("GET", './tile/' + nom + '.json', false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)){
        throw new Error("Impossible de charger la carte nommé \"" + nom + "\"(code HTTP : " + xhr.status + ").");
    }
    var mapJsonData = xhr.responseText;

    var mapData = JSON.parse(mapJsonData);

    this.tileset = new Tileset(mapData.tileset);
    this.terrain = mapData.terrain;
}

Map.prototype.getHauteur = function(){
    return this.terrain.length;
}
Map.prototype.getLargeur = function (){
    return this.terrain[0].length;
}

Map.prototype.dessinerMap = function(context){
    for(var i = 0, l = this.terrain.length ; i < l ; i++) {
        var ligne = this.terrain[i];
        var y = i*32;
        for(var j = 0, k = ligne.length; j<k; j++){
            this.tileset.dessinerTile(ligne[j], context, j*32, y);
        }
    }
}*/


// version premier circuit

function Map(nom){
    // création de l'objet XmlHttpRequest
    var xhr = getXMLHttpRequest();

    // chargement fichier JSON
    xhr.open("GET", '../../json/tile/' + nom + '.json', false);
    xhr.send(null);
    if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)){
        throw new Error("Impossible de charger la carte nommé \"" + nom + "\"(code HTTP : " + xhr.status + ").");
    }
    var mapJsonData = xhr.responseText;

    var mapData = JSON.parse(mapJsonData);

    this.tileset = new Tileset(mapData.tileset);
    this.terrain = mapData.carte;
    this.rotate = mapData.rotation;
}

Map.prototype.getHauteur = function(){
    return this.terrain.length;
}
Map.prototype.getLargeur = function (){
    return this.terrain[0].length;
}

Map.prototype.dessinerMap = function(context){
    for(var i = 0, l = this.terrain.length ; i < l ; i++) {
        var ligne = this.terrain[i];
        var angle = this.rotate[i];
        var y = i*160;
        for(var j = 0, k = ligne.length; j<k; j++){
            this.tileset.dessinerTile(ligne[j], context, j*160, y, angle[j]);
        }
    }
}

Map.prototype.isImagePresent = function(index) {
    // Remplacez 'carte' par le nom correct de votre propriété dans le fichier JSON
    return this.terrain[0][index] !== undefined;
};