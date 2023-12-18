import {Map} from "./entities/Map.js";
import {Tileset} from "./entities/Tileset.js";


window.onload = function () {

    const tiles = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    ];

    const rotations = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const map = new Map(new Tileset("circuit.png"), tiles, rotations);

    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');

    canvas.width  = map.getLargeur()*160;
    canvas.height = map.getHauteur()*160;

    map.dessinerMap(context);

    console.log("aaa")

}














