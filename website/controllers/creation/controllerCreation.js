import {TileChooser} from "../../models/creation/TileChooser.js";

let tileChooser;

window.onload = () => {
	tileChooser = new TileChooser();
	
	/*
	//****************************************************************************************************************************
	//test pour le chargement de la matrice principale (pour essdaayer de savoir pourquoi elle ne s'affiche pas au début)
	//****************************************************************************************************************************
	const localStorageMatrix = localStorage.getItem('matrix');
		console.log("localStorageMatrix : "+ localStorageMatrix);
		if(localStorageMatrix === null || localStorageMatrix === undefined || localStorageMatrix === "") {
			this.newMatrix();
		} else {
			this._matrix = JSON.parse(localStorageMatrix);
		}
		
		const div = document.querySelector('#choosers');
		this._circuit = document.querySelector('#circuit');
		
		// empty circuit
		this._map.dessinerTuiles(this._matrix[0], this._matrix[1], this._circuit, 80);
		this._map.replaceTiles(  this._matrix[0], this._matrix[1], this._circuit, 80, this._matrix[1]);
		
		// 1st container with common tiles. Visible by default.
		const cont1 = document.createElement('section');
		cont1.classList.add('tile-selector');
		this._map.dessinerTuiles([1, 2, 3, 4, 5, 6, 8, 9, 10, 11], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], cont1);
		div.appendChild(cont1);
		
		// 2nd container with starts and ends. Invisible by default.
		const cont2 = document.createElement('section');
		cont2.classList.add('tile-selector');
		cont2.classList.add('invisible');
		this._map.dessinerTuiles([7, 12], [0, 0], cont2);
		div.appendChild(cont2);
		
		// 3rd container with checkpoints. Invisible by default.
		const cont3 = document.createElement('section');
		cont3.classList.add('tile-selector');
		cont3.classList.add('invisible');
		this._map.dessinerTuiles([13, 14, 15, 16, 17, 18], [0, 0, 0, 0, 0, 0], cont3);
		div.appendChild(cont3);
	//****************************************************************************************************************************
	*/
	
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
	
	// eventListener to choose the tile you want to place
	const divList = document.querySelectorAll('.tile-selector div');
	for(let i = 0 ; i < divList.length ; i++) {
		divList[i].addEventListener('click', (evt) => {
			
			// to show the selected image
			const children = divList[i].parentElement.children; // get siblings from the same selector
			for(let i = 0 ; i < children.length ; i++) {
				
				if (children[i] === evt.currentTarget && !children[i].classList.contains('selected')) {
					children[i].classList.add('selected');
				} else {
					children[i].classList.remove('selected');
				}
			}
		});
	}
	
	// eventListener on the circuit divs
	const cDivs = document.querySelectorAll('#circuit div');
	for(let i = 0; i < cDivs.length; i++) {
		cDivs[i].oncontextmenu = () => {return false;};
		cDivs[i].addEventListener('mousedown', (evt) => {
			if(evt.button === 0) {  // left click listener (place)
				// if a selector tile is selected, please replace it
				const sDivs = document.querySelectorAll('.tile-selector div');
				for(let j = 0; j < sDivs.length; j++) {
					if(sDivs[j].classList.contains('selected')) {
						tileChooser.matrix[0][i] = parseInt(sDivs[j].getAttribute('name'));
						tileChooser.map.replaceTiles(tileChooser.matrix[0], tileChooser.matrix[1], tileChooser.circuit, 80, tileChooser.matrix[1]);
					}
				}
				localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix));
				
			} else if (evt.button === 2) { // right click listener (rotate)
				tileChooser.matrix[1][i] = (tileChooser.matrix[1][i] + 90) % 360;
				tileChooser.map.replaceTiles(tileChooser.matrix[0], tileChooser.matrix[1], tileChooser.circuit, 80, tileChooser.matrix[1]);
				localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix));
			}
		});
	}
	
	// GESTION DE LA REINITIALISATION
	document.querySelector('#reinitbutton').addEventListener('click', () => {
		tileChooser.reset();
		localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix))
	});
}

window.onunload = () => {
	if (tileChooser !== undefined) localStorage.setItem('matrix', JSON.stringify(tileChooser.matrix));
}