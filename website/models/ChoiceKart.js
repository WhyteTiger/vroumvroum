import {Tileset} from "./entities/Tileset.js";
import {Map} from "./entities/Map.js";
import {ControllerVoiture} from "../controllers/gameplay/controllerVoiture.js";
import {ButtonKart} from "./entities/ButtonKart.js";
import {Coin} from './entities/Coin.js';

const carte = [
	[37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
];
const rotation = [
	[270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270]
];

// A remplacer plus tard par les valeurs chargée par l'api
const valButton = [1, -1, -1, 52, 65, -1, 235, 23, 45, 47, 32, 69];

window.localStorage.setItem("vroumCoin", "200");
let vroumCoin = window.localStorage.getItem("vroumCoin");

const pieceVroum = [
	[33]
];

const pileVroum = [
	[34]
];

const rotationVroum = [
	[0]
];

const map = new Map(new Tileset("circuit.png"), carte, rotation);

const listeButton = creationButton();


// création des bouttons qui vont contenir la valeur de la voiture vis à vis des joueurs.
function creationButton(){
	const listeButton = [];
	for (let i=0; i<map.getLargeur(); i++){
		//console.log(valButton[i]);
		listeButton.push(new ButtonKart(valButton[i]));
	}
	//console.log(listeButton[0]);
	return listeButton;
}

window.onload = function(){
	const canvas = document.getElementById('canvasChoix');
	const ctx = canvas.getContext('2d');
	
	canvas.width  = map.getLargeur()*160;
	canvas.height = map.getHauteur()*160;
	
	map.dessinerKart(ctx, carte, rotation);

	const vroumCoinContainer = document.getElementById('vroumCoinContainer');
	const vroumCoinDiv = document.getElementById('vroumCoinDiv');

	updateVroumCoin();

	const pileCoin = new Coin('../../assets/tilesets/circuit.png', pieceVroum, rotationVroum);
	pileCoin.dessinerPiece(vroumCoinContainer);

	function updateVroumCoin(){
		if (vroumCoin >= 100){
			vroumCoinDiv.innerText = vroumCoin;
		}
		else if (vroumCoin < 100){
			vroumCoinDiv.innerText = "0" + vroumCoin;
		}
		else{
			vroumCoinDiv.innerText = "00" + vroumCoin;
		}


	}
	
	const buttonsContainer = document.getElementById('buttonsContainer');

	let chosenButtonIndex = null;
	
	for (let i = 0; i < map.getLargeur(); i++) {
		const container = document.createElement('div');
		container.id='divChoixCar';
		const button = document.createElement('button');
		const prix = document.createElement('p');
		prix.id = 'pCoin';
		if (listeButton[i].getVal() === 1){
			button.id='buttonCarChoisi';
			button.innerHTML = 'utilise';
		}
		if (listeButton[i].getVal() === -1){
			button.id='buttonCar';
			button.innerHTML = 'choisir';

		}
		if (listeButton[i].getVal() > 1 ){
			button.id='buttonCarAchat';
			button.innerHTML = 'Acheter';
			prix.innerHTML = listeButton[i].getVal();
			const coin = new Coin('../../assets/tilesets/circuit.png', pileVroum, rotationVroum);
			coin.dessinerPiece(prix);
		}

		button.onclick   = function() {
			if(button.id === 'buttonCarChoisi'){
				return;
			}
			
			if(button.id === 'buttonCar'){
				//mise a jour des bouton utilise en choisir
				for (let j = 0; j < map.getLargeur(); j++) {
					const otherContainer = buttonsContainer.children[j];
					const otherButton = otherContainer.querySelector('button');
					console.log(otherButton);
					if (otherButton.id === 'buttonCarChoisi') {
						otherButton.id = 'buttonCar';
						otherButton.innerHTML = 'choisir';
					}
				}
				button.id = 'buttonCarChoisi';
				button.innerHTML = 'utilise';
				chosenButtonIndex = i;  // Stockez l'index du bouton "choisir"
			}
			
			let result = 0;
			
			if (button.id === "buttonCarAchat"){
				const controller = new ControllerVoiture(listeButton[i].getVal(), vroumCoin);
				result = controller.buttonPress();
				// suprime le prix une fois la voiture achetée !


				// Mise à jour du texte du bouton et de la quantité de vroumCoin
				if (result === 1) {
					button.id = 'buttonCar';
					button.innerHTML = 'choisir';
					vroumCoin = controller.getUpdatedVroumCoin(); // mise à jour la quantité de vroumCoin
					updateVroumCoin();
					prix.remove();
				}
			}
			
		};

		container.appendChild(button);
		container.appendChild(prix);
		buttonsContainer.appendChild(container);
		if (map.isImagePresent(i)) {
			button.style.display = 'block';
		} else {
			button.style.display = 'none';
		}
	}
}
