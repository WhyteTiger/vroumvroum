var map = new Map("prCircuit");

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');   // le contexte

    canvas.width = map.getLargeur()*160; // ne pas oublier de remplacer le 32 par 160;
    canvas.height = map.getHauteur()*160;

    map.dessinerMap(ctx);
}
