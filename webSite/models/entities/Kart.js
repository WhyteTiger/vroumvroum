import {Tileset} from "./Tileset.js";

const carte = [
	[37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
];
const rotation = [
	[270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270]
];
const map = new Map(new Tileset("circuit.png"), carte, rotation);

window.onload = function(){
	const canvas = document.getElementById('canvasChoix');
	const ctx = canvas.getContext('2d');
	
	canvas.width  = map.getLargeur()*160;
	canvas.height = map.getHauteur()*160;
	
	map.dessinerMap(ctx);
	
	const buttonsContainer = document.getElementById('buttonsContainer');
	for (let i = 0; i < map.getLargeur(); i++) {
		const button = document.createElement('button');
		button.id='buttonCar';
		button.innerHTML = 'Choisir';
		button.onclick   = function() {
			console.log('Image sélectionnée : ' + i);
		};
		
		buttonsContainer.appendChild(button);
		if (map.isImagePresent(i)) {
			button.style.display = 'block';
		} else {
			button.style.display = 'none';
		}
	}
}
