import {Map} from "./classes/Map.js";
import {API} from "./API.js";
import {Tileset} from "./classes/Tileset.js";

window.onload = function () {
    
    const circuitId = window.localStorage.circuitId;
    
    const url = API.getURLgetCircuitTileById();
    const data = {
        circuitIdIn: circuitId
    };
    console.log(data);
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    
    console.log(params);
    
    fetch(url, params)
       .then((response) => response.json())
       .then((data) => {
           console.log("data.tileset : " + data.tileSet + "\ndta.circuit : " + data.tileSet.circuit + "\ndata.rotation : " + data.tileSet.rotation);
           
           const tileset = new Tileset("circuit.png");
           console.log(tileset);
           const map = new Map(tileset, data.tileSet.circuit, data.tileSet.rotation);
           
           const canvas = document.getElementById('canvas');
           const ctx = canvas.getContext('2d');
           
           canvas.width = map.getLargeur() * 160;
           canvas.height = map.getHauteur() * 160;
           
           map.dessinerMap(ctx);
       })
       .catch(() => {
           console.log("Fetch failed");
       });
}
