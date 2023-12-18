import {Map} from "../../models/entities/Map.js";
import {Tileset} from "../../models/entities/Tileset.js";

var tiles = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]];
var rotations = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
new Map(new Tileset("circuit.png"), tiles, rotations).dessinerTuiles(tiles, rotations);

console.log(tiles)
console.log(rotations)

function revalidate() {
    new Map(new Tileset("circuit.png"), tiles, rotations).dessinerTuiles(tiles, rotations);
}


document.querySelector('#buttons-info').addEventListener('click', (evt) => {
    const content = document.querySelector('#tile-selector');
    while(content.firstChild) content.removeChild(content.firstChild);

    const buttons = document.querySelectorAll('.chooser');
    
    for(let i = 0 ; i < buttons.length ; i++) {
        // to modify the class
        if(buttons[i] === evt.target) {
            buttons[i].classList.add('selected');
            switch(buttons[i].id) {
                case 'b1' :
                    tiles = [[1, 2, 3, 4, 5, 6, 8, 9, 10, 11]];
            rotations = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
                    break;
                case 'b2' :
                    tiles = [[7, 12]];
            rotations = [[0, 0]];
                    break;
                case 'b3' :
                    tiles = [[13, 14, 15, 16, 17, 18]];
            rotations = [[0, 0, 0, 0, 0, 0]];
                    break;
            }
        } else buttons[i].classList.remove('selected');

        
    }

    console.log(tiles)
        console.log(rotations)
        revalidate();
});