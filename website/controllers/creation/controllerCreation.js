// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { TileChooser }  	 from "../../models/creation/TileChooser.js";
import { Alert } 		  	    from "../../models/entities/Alert.js";
import { CircuitCareTaker } from "../../models/creation/CircuitCareTaker.js";
import { Circuits } 			 from "../../models/entities/Circuits.js";
import { Circuit } 			 from "../../models/entities/Circuit.js";

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/createMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();
let tileChooser = new TileChooser(), undoStack, redoStack;


window.onload = () => {
	const isModifying = localStorage.getItem('modify');
	const circuitId   = localStorage.getItem('circuitId');
	
	if (isModifying === 'true') {
		
		console.log("CIRCUITID : "+ circuitId);
		console.log("Etape 1");
		const circuit = Circuits.get(circuitId);
		console.log(circuit);
		console.log("Etape 2");
		let tab = circuit.getMatrix();
		console.log("Etape 12");
		
		let tempMatrix    = [];
		let tempTiles     = [];
		let tempRotations = [];
		
		for(let i = 0 ; i < tab.circuit[0].length ; i++) {	// all arrays are the same length
			for(let j = 0 ; j < tab.circuit[0][i].length ; j++) {
				tempTiles.push(tab.circuit[0][i][j]);
				tempRotations.push(tab.circuit[1][i][j]);
			}
		}
		
		tempMatrix.push(tempTiles);
		tempMatrix.push(tempRotations);
		
		tileChooser.setMatrix(tempMatrix);
		tileChooser.reload();
		
		
		setTimeout(() => {
			tileChooser.reload();
			
			undoStack = new CircuitCareTaker();
			redoStack = new CircuitCareTaker();
		}, 200);
		
		document.querySelector('#buttonsInfo').addEventListener('click', (evt) => {
			const buttons = document.querySelectorAll('.chooser');
			
			for(let i = 0 ; i < buttons.length ; i++) {
				// to modify the class
				if(buttons[i] === evt.target) {
					buttons[i].classList.add('selected');
					
					const sectionList = document.querySelectorAll('section.tileSelector');
					
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
			const divList = document.querySelectorAll('.tileSelector div');
			for(let i = 0; i < divList.length; i++) {
				divList[i].classList.remove('selected');
			}
		});
		
		
		
		// eventListener on the circuit divs
		const cDivs = document.querySelectorAll('#circuit div');
		for(let i = 0; i < cDivs.length; i++) {
			cDivs[i].oncontextmenu = () => {return false;};
			cDivs[i].addEventListener('mousedown', (evt) => {
				undoStack.push(JSON.parse(localStorage.getItem('matrixModify')));
				redoStack.resetStack();
				
				if (evt.button === 2) { // right click listener (rotate)
					tileChooser.matrix[1][i] = (tileChooser.matrix[1][i] + 90) % 360;
					tileChooser.map.replaceTiles(tileChooser.matrix[0], tileChooser.matrix[1], tileChooser.circuit, 60, tileChooser.matrix[1]);
					localStorage.setItem('matrixModify', JSON.stringify(tileChooser.matrix));
				}
			});
		}
		
		// GESTION DE LA REINITIALISATION
		document.querySelector('#reinitbutton').addEventListener('click', () => {
			tileChooser.reset();
			
			undoStack.push(JSON.parse(localStorage.getItem('matrixModify')));
			redoStack.resetStack();
			
			localStorage.setItem('matrixModify', JSON.stringify(tileChooser.matrix));
		});
		
	} else if (isModifying === "false") {
		setTimeout(() => {
			tileChooser.reload();
			
			undoStack = new CircuitCareTaker();
			redoStack = new CircuitCareTaker();
		}, 200);
		
		document.querySelector('#buttonsInfo').addEventListener('click', (evt) => {
			const buttons = document.querySelectorAll('.chooser');
			
			for(let i = 0 ; i < buttons.length ; i++) {
				// to modify the class
				if(buttons[i] === evt.target) {
					buttons[i].classList.add('selected');
					
					const sectionList = document.querySelectorAll('section.tileSelector');
					
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
			const divList = document.querySelectorAll('.tileSelector div');
			for(let i = 0; i < divList.length; i++) {
				divList[i].classList.remove('selected');
			}
		});
		
		// eventListener on the circuit divs
		const cDivs = document.querySelectorAll('#circuit div');
		for(let i = 0; i < cDivs.length; i++) {
			cDivs[i].oncontextmenu = () => {return false;};
			cDivs[i].addEventListener('mousedown', (evt) => {
				undoStack.push(JSON.parse(localStorage.getItem('matrix')));
				redoStack.resetStack();
				
				if (evt.button === 2) { // right click listener (rotate)
					tileChooser.matrix[1][i] = (tileChooser.matrix[1][i] + 90) % 360;
					tileChooser.map.replaceTiles(tileChooser.matrix[0], tileChooser.matrix[1], tileChooser.circuit, 60, tileChooser.matrix[1]);
					localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix));
				}
			});
		}
		
		// GESTION DE LA REINITIALISATION
		document.querySelector('#reinitbutton').addEventListener('click', () => {
			tileChooser.reset();
			const isModifying = localStorage.getItem('modify');
			
			isModifying === 'true' ? undoStack.push(JSON.parse(localStorage.getItem('matrixModify'))) : undoStack.push(JSON.parse(localStorage.getItem('matrix')));
			redoStack.resetStack();
			
			isModifying === 'true' ? localStorage.setItem('matrixModify', JSON.stringify(tileChooser.matrix)) : localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix));
		});
	}
	
	const isChecked = localStorage.getItem("isChecked");
	if (isChecked === "false") {
		
		document.querySelector('#savebutton').addEventListener('click', () => {
			let circuitIsValid = "false";
			let oneStartEnd   = 0;
			let oneCheckPoint = 0;
			
			let matrix;
			const isModifying = localStorage.getItem('modify');
			isModifying === 'true' ? matrix = JSON.parse(localStorage.getItem('matrixModify')) : matrix = JSON.parse(localStorage.getItem('matrix'));
			
			const len = matrix[0].length;
			for (let i = 0; i < len; i++) {
				let currentTile = matrix[0][i];
				
				if (oneStartEnd !== 1 && (currentTile === 7 || currentTile === 12)) {
					oneStartEnd = 1;
				}
				if (oneCheckPoint !== 1 && currentTile >= 13 && currentTile <= 18) {
					oneCheckPoint = 1;
				}
				if (oneStartEnd === 1 && oneCheckPoint === 1) {
					circuitIsValid = "true";
					i = len; // break
				}
			}
			if (circuitIsValid === "true") {
				isModifying === 'true' ? localStorage.setItem('matrixModify', JSON.stringify(matrix)) : localStorage.setItem('matrix', JSON.stringify(matrix));
				
				const popUp = new Alert("Voulez vous sauvegarder votre circuit ?", "Sauvegarder", "playCircuit.html", 'save');
				popUp.customAlert();
			} else {
				const popUp = new Alert("Votre circuit n'est pas valide : veuillez mettre au moins un départ, une arrivée et un checkpoint.", "OK", "", 'warning');
				popUp.customAlert();
			}
		});
		
	} else if (isChecked === "true") {
		
		let matrix;
		let newCircuit;
		let newCircuitId;
		const circuitName = localStorage.getItem("circuitName");
		const creatorTime = localStorage.getItem("creatorTime");
		const circuitLaps = localStorage.getItem("circuitLaps");
		const isModifying = localStorage.getItem('modify');
		
		if (isModifying === 'true') {
			matrix = JSON.parse(localStorage.getItem('matrixModify'));
			newCircuitId = localStorage.getItem("circuitId");
			newCircuit = Circuits.get(circuitId);
			newCircuit.edit(matrix, creatorTime, circuitLaps, circuitName);
		} else {
			matrix = JSON.parse(localStorage.getItem('matrix'));
			const playerName  = localStorage.getItem("playerName");
			newCircuit = new Circuit(circuitName, playerName, creatorTime, circuitLaps, matrix);
			newCircuitId = newCircuit.getCircuitId();
			Circuits.add(newCircuit);
		}
		
		console.log("AYAYA");
		console.log(Circuits.circuitList);
		console.log("CIRCUITID : "+ newCircuitId);
		
		localStorage.setItem("circuitId", newCircuitId);
		localStorage.setItem("isChecked", "false");
		localStorage.setItem("creatorTime", "");
		
		console.log("circuit sauvegardé");
		
		if (isModifying === "false") {
			localStorage.setItem("matrixModify", localStorage.getItem('matrix'));
			localStorage.setItem("modify", "true");
		}
		
		const popUpSuccess = new Alert("Votre circuit a bien été sauvegardé", "OK", "", 'info');
		popUpSuccess.customAlert();
	}
}

window.onunload = () => {
	if (tileChooser !== undefined) {
		localStorage.getItem('modify') === "false" ?  localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix)) : localStorage.setItem('matrixModify', JSON.stringify(tileChooser.matrix));
	}
};

document.addEventListener('keydown', (event) => {
	
	if (event.ctrlKey && event.key === 'z') {
		const lastState = undoStack.pop();
		if (lastState !== null) {
			redoStack.push(tileChooser.matrix);
			tileChooser.setMatrix(lastState);
			tileChooser.reload();
			
			localStorage.getItem('modify') === "false" ?  localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix)) : localStorage.setItem('matrixModify', JSON.stringify(tileChooser.matrix));
		} else {
			console.log("Faites une action avant de vouloir revenir en arrière");
		}
	} else if (event.ctrlKey && event.key === 'y') {
		const nextState = redoStack.pop();
		if (nextState !== null) {
			undoStack.push(tileChooser.matrix);
			tileChooser.setMatrix(nextState);
			tileChooser.reload();
			
			localStorage.getItem('modify') === "false" ?  localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix)) : localStorage.setItem('matrixModify', JSON.stringify(tileChooser.matrix));
		} else {
			console.log("Faites un undo avant de faire un redo");
		}
	}
});
