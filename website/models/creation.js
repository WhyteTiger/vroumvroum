import {Map} from "./entities/Map.js";
import {Tileset} from "./entities/Tileset.js";

const tiles = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]];
const rotations = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

const map = new Map(new Tileset("circuit.png"), tiles, rotations);

window.onload = function () {
    map.dessinerTuiles(tiles, rotations);
    console.log("aaa")
}














