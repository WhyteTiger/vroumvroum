import {Map} from "./classes/Map.js";

window.onload = function(){
    const map = new Map(1);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = map.getLargeur()*160;
    canvas.height = map.getHauteur()*160;

    map.dessinerMap(ctx);
}
