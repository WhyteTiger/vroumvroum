import {TileChooser} from "../../models/creation/TileChooser.js";

let tileChooser;

window.onload = () => {
	tileChooser = new TileChooser();
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