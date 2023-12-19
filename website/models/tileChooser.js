import {Map} from "./entities/Map.js";
import {Tileset} from "./entities/Tileset.js";

var tiles = [[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]];
var rotations = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

const map = new Map(new Tileset("circuit.png"), tiles, rotations);

window.onload = function () {
    const div = document.querySelector('#choosers');

    // 1st container with common tiles. Visible by default.
    const cont1 = document.createElement('section');
    cont1.classList.add('tile-selector');
    map.dessinerTuiles([[1, 2, 3, 4, 5, 6, 8, 9, 10, 11]], [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], cont1);
    div.appendChild(cont1);

    // 2nd container with starts and ends. Invisible by default.
    const cont2 = document.createElement('section');
    cont2.classList.add('tile-selector');
    cont2.classList.add('invisible');
    map.dessinerTuiles([[7, 12]], [[0, 0]], cont2);
    div.appendChild(cont2);

    // 3rd container with checkpoints. Invisible by default.
    const cont3 = document.createElement('section');
    cont3.classList.add('tile-selector');
    cont3.classList.add('invisible');
    map.dessinerTuiles([[13, 14, 15, 16, 17, 18]], [[0, 0, 0, 0, 0, 0]], cont3);
    div.appendChild(cont3);

    // eventListener to display the correct container
    document.querySelector('#buttons-info').addEventListener('click', (evt) => {
        const buttons = document.querySelectorAll('.chooser');
        
        for(let i = 0 ; i < buttons.length ; i++) {
            // to modify the class
            if(buttons[i] === evt.target) {
                buttons[i].classList.add('selected');

                const sectionList = document.querySelectorAll('section.tile-selector');

                switch(buttons[i].id) {
                    case 'b1' :
                        sectionList[0].classList.remove('invisible');
                        sectionList[1].classList.add('invisible');
                        sectionList[2].classList.add('invisible');
                        break;
                    case 'b2' :
                        sectionList[0].classList.add('invisible');
                        sectionList[1].classList.remove('invisible');
                        sectionList[2].classList.add('invisible');
                        break;
                    case 'b3' :
                        sectionList[0].classList.add('invisible');
                        sectionList[1].classList.add('invisible');
                        sectionList[2].classList.remove('invisible');
                }
            }
            else buttons[i].classList.remove('selected');
        }
    });

    // eventListener to try things lmao
    const divList = document.querySelectorAll('.tile-selector div');
    for(let i = 0 ; i < divList.length ; i++) {
        divList[i].addEventListener('click', (evt) => {
            console.log(divList[i].id);
        });
    }




    
}














