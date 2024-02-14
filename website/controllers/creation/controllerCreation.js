// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { API } 		 	    from "../../models/API.js";
import { TileChooser }  	 from "../../models/creation/TileChooser.js";
import { Alert } 		  	    from "../../models/entities/Alert.js";
import { CircuitCareTaker } from "../../models/creation/CircuitCareTaker.js";

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/createMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();
let tileChooser = new TileChooser(), undoStack, redoStack;


window.onload = () => {
	
	if (localStorage.getItem('modify') === 'true') {
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
				
				setTimeout(() => {
					tileChooser.reload();
					
					console.log("init memento");
					undoStack = new CircuitCareTaker();
					redoStack = new CircuitCareTaker();
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
			})
			.catch((err) => console.error(`PROBLEME FETCH PERSO : ${err}`));
		
	} else { // modify !== 'true'
		setTimeout(() => {
			tileChooser.reload();
			
			undoStack = new CircuitCareTaker();
			redoStack = new CircuitCareTaker();
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
			
			undoStack.push(JSON.parse(localStorage.getItem('matrix')));
			redoStack.resetStack();
			
			localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix));
		});
	}
	
	if (localStorage.getItem("isChecked") === "false") { // means we're on the creation page and circuit isn't checked
		console.log("isChecked === false");
		
		document.querySelector('#savebutton').addEventListener('click', () => {
			
			let circuitIsValid = "false";
			
			let matrix;
			localStorage.getItem('modify') === 'true' ? matrix = JSON.parse(localStorage.getItem('matrixModify')) : matrix = JSON.parse(localStorage.getItem('matrix'));
			
			const len = matrix[0].length;
			for (let i = 0; i < len; i++) {
				if (matrix[0][i] === 7 || matrix[0][i] === 12) {
					circuitIsValid = "true";
					i = len; // break
				}
			}
			if (circuitIsValid === "true") {
				localStorage.getItem('modify') === 'true' ? localStorage.setItem('matrixModify', JSON.stringify(matrix)) : localStorage.setItem('matrix', JSON.stringify(matrix));
				
				const popUp = new Alert("Voulez vous sauvegarder votre circuit ?", "Sauvegarder", "playCircuit.html", 'save');
				popUp.customAlert();
			} else {
				const popUp = new Alert("Votre circuit n'est pas valide : veuillez mettre au moins un départ et une arrivée.", "OK", "", 'warning');
				popUp.customAlert();
			}
		});
		
	} else if (localStorage.getItem("isChecked") === "true") { // means we're on the creation page and circuit is checked
		console.log("isChecked === true");
		
		let matrixIn;
		localStorage.getItem('modify') === 'true' ? matrixIn = JSON.parse(localStorage.getItem('matrixModify')) : matrixIn = JSON.parse(localStorage.getItem('matrix'));
		console.log("matrixIn : "+ matrixIn);
		
		const playerIdIn    = localStorage.getItem("playerId");
		const circuitIdIn   = localStorage.getItem("circuitId");
		const circuitNameIn = localStorage.getItem("circuitName");
		const creatorTimeIn = localStorage.getItem("creatorTime");
		const circuitLapsIn = localStorage.getItem("circuitLaps");
		
		const dataCircuit = {
			playerIdIn,
			circuitIdIn,
			matrixIn,
			circuitNameIn,
			creatorTimeIn,
			circuitLapsIn
		};
		const params = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataCircuit)
		};
		
		let url;
		localStorage.getItem("modify") === "true" ? url = API.getURLmodifyCircuitOfPlayerId() : url = API.getURLpostCircuitOfPlayerId();
		console.log("url : "+ url);
		
		fetch(url, params)
			.then((response) => response.json())
			.then((dataCircuit) => {
				if (dataCircuit.success === "true") {
					console.log("circuit sauvegardé");
					const popUpSuccess = new Alert("Votre circuit a bien été sauvegardé", "OK", "", 'info');
					popUpSuccess.customAlert();
				} else {
					console.error("saved error");
				}
				
				localStorage.setItem("creatorTime", "");
				localStorage.setItem("isChecked", "false");
			});
	} else {
		console.error("Error controllerAside : Nothing good");
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
