/*var ts = new Tileset("basique.png");

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ts.dessinerTile(1, ctx, 10, 10);
    ts.dessinerTile(5, ctx, 50, 10);
    ts.dessinerTile(6, ctx, 90, 10);
    ts.dessinerTile(7, ctx, 130, 10);
}*/

// version exemple du site :
/*var map = new Map("premiere");

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');   // le contexte

    canvas.width = map.getLargeur()*32; // ne pas oublier de remplacer le 32 par 160;
    canvas.height = map.getHauteur()*32;

    map.dessinerMap(ctx);
}*/


// version premier circuit

var map = new Map("prCircuit");

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');   // le contexte

    canvas.width = map.getLargeur()*160; // ne pas oublier de remplacer le 32 par 160;
    canvas.height = map.getHauteur()*160;

    map.dessinerMap(ctx);
}
