import {Map} from "./entities/Map.js";
import {Tileset} from "./entities/Tileset.js";

var tiles = [[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]];
var rotations = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

const map = new Map(new Tileset("circuit.png"), tiles, rotations);

window.onload = function () {
    const div = document.querySelector('#choosers');

    const cont1 = document.createElement('section');
    cont1.classList.add('tile-selector');
    map.dessinerTuiles([[1, 2, 3, 4, 5, 6, 8, 9, 10, 11]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], cont1);
    div.appendChild(cont1);

    const cont2 = document.createElement('section');
    cont2.classList.add('tile-selector');
    map.dessinerTuiles([[7, 12]], [[0, 0]], cont2);
    div.appendChild(cont2);

    const cont3 = document.createElement('section');
    cont3.classList.add('tile-selector');
    map.dessinerTuiles([[13, 14, 15, 16, 17, 18]], [[0, 0, 0, 0, 0, 0]], cont3);
    div.appendChild(cont3);

    


    
}














