// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { API } from "../../models/API.js";
import {TileChooser} from "../../models/creation/TileChooser.js";
import {CircuitOriginator} from "../../models/creation/CircuitOriginator";
import {CircuitCareTaker} from "../../models/creation/CircuitCareTaker";

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/createMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();

let tileChooser = new TileChooser(), originator, careTaker;

function initMemento() {
	originator = new CircuitOriginator(tileChooser.matrix);
	careTaker  = new CircuitCareTaker();
	careTaker.push(originator);
}

function saveCurrentState() {
	originator.matrix = tileChooser.matrix;
	careTaker.push(originator);
}

if (localStorage.getItem('personal') === 'true') {
	let fetchParams = {
		circuitIdIn: localStorage.getItem('circuitId')
	};

	let params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(fetchParams)
	};

	fetch(API.getURLgetCircuitTileById(), params)
	.then((response) => response.json())
	.then((data) => {

		let tab = data.tileSet;

		let tempMatrix    = [];
		let tempTiles     = [];
		let tempRotations = [];

		for(let i = 0 ; i < tab.circuit.length ; i++) {	// all arrays are the same length
			for(let j = 0 ; j < tab.circuit[i].length ; j++) {
				tempTiles.push(tab.circuit[i][j]);
				tempRotations.push(tab.rotation[i][j]);
			} 
		}

		tempMatrix.push(tempTiles);
		tempMatrix.push(tempRotations);

		tileChooser.setMatrix(tempMatrix);
		tileChooser.reload();
		
		initMemento();

		setTimeout(() => {
			tileChooser.reload();
		}, 200);
		
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
							break;
					}
				}
				else buttons[i].classList.remove('selected');
			}
			
			// need to de-select every div
			const divList = document.querySelectorAll('.tile-selector div');
			for(let i = 0; i < divList.length; i++) {
				divList[i].classList.remove('selected');
			}
		});
		
		// eventListener on the circuit divs
		const cDivs = document.querySelectorAll('#circuit div');
		for(let i = 0; i < cDivs.length; i++) {
			cDivs[i].oncontextmenu = () => {return false;};
			cDivs[i].addEventListener('mousedown', (evt) => {
				if (evt.button === 2) { // right click listener (rotate)
					tileChooser.matrix[1][i] = (tileChooser.matrix[1][i] + 90) % 360;
					tileChooser.map.replaceTiles(tileChooser.matrix[0], tileChooser.matrix[1], tileChooser.circuit, 80, tileChooser.matrix[1]);
					localStorage.setItem('matrixPerso', JSON.stringify(tileChooser.matrix));
					
					saveCurrentState();
				}
			});
		}
		
		// GESTION DE LA REINITIALISATION
		document.querySelector('#reinitbutton').addEventListener('click', () => {
			tileChooser.reset();
			localStorage.setItem('matrixPerso', JSON.stringify(tileChooser.matrix));
			
			saveCurrentState();
		});
	})
	.catch((err) => console.error(`PROBLEME FETCH PERSO : ${err}`));
} else {

	setTimeout(() => {
		tileChooser.reload();
		
		initMemento();
	}, 200);


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
						break;
				}
			}
			else buttons[i].classList.remove('selected');
		}
		
		// need to de-select every div
		const divList = document.querySelectorAll('.tile-selector div');
		for(let i = 0; i < divList.length; i++) {
			divList[i].classList.remove('selected');
		}
	});
	
	// eventListener on the circuit divs
	const cDivs = document.querySelectorAll('#circuit div');
	for(let i = 0; i < cDivs.length; i++) {
		cDivs[i].oncontextmenu = () => {return false;};
		cDivs[i].addEventListener('mousedown', (evt) => {
			if (evt.button === 2) { // right click listener (rotate)
				tileChooser.matrix[1][i] = (tileChooser.matrix[1][i] + 90) % 360;
				tileChooser.map.replaceTiles(tileChooser.matrix[0], tileChooser.matrix[1], tileChooser.circuit, 80, tileChooser.matrix[1]);
				localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix));
				
				saveCurrentState();
			}
		});
	}
	
	// GESTION DE LA REINITIALISATION
	document.querySelector('#reinitbutton').addEventListener('click', () => {
		tileChooser.reset();
		localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix));
		
		saveCurrentState();
	});
}


window.onunload = () => {
	if (tileChooser !== undefined) {
		localStorage.getItem('personal') === "false" ? localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix)) : localStorage.setItem('matrixPerso', JSON.stringify(tileChooser.matrix));
	}
};

document.addEventListener('keydown', (event) => {
	if (event.ctrlKey && event.key === 'z') {
		const lastState = careTaker.pop();
		lastState !== null ? originator.restore(lastState) : console.log("Faites une action avant de vouloir revenir en arrière");
	}
});