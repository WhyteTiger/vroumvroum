// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import {Tileset} from "./entities/Tileset.js";
import {Map} from "./entities/Map.js";
import {ControllerVoiture} from "../controllers/gameplay/controllerVoiture.js";
import {ButtonKart} from "./entities/ButtonKart.js";
import {Coin} from './entities/Coin.js';
import {API} from "./API.js";

let listeButton;
let vroumCoin;

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/personalizeMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();

window.onload = () => {
	
	const carte = [
		[37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
	];
	const rotation = [
		[270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270, 270]
	];
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
	
	const valButtonInit = carte;
	vroumCoin = localStorage.getItem("Coins");
	
	// création des bouttons qui vont contenir la valeur de la voiture vis à vis des joueurs.
	function creationButton() {
		
		const kartId = Number(localStorage.getItem("kartId"));
		
		const listeButton = [];
		for (let i = 0; i < map.getLargeur(); i++) {
			listeButton.push(new ButtonKart(valButtonInit[i]));
			if (i === kartId) {
				listeButton[i].setValue(-1);
			} else {
				listeButton[i].setValue(0);
			}
			
		}
		
		return listeButton;
	}
	listeButton = creationButton();
	
	const vroumCoinContainer = document.getElementById('vroumCoinContainer');
	const vroumCoinDiv 		= document.getElementById('vroumCoinDiv');
	
	updateVroumCoin();
	
	const pileCoin = new Coin('../../assets/tilesets/circuit.png', pieceVroum, rotationVroum);
	pileCoin.dessinerPiece(vroumCoinContainer);
	
	function updateVroumCoin(){
		if (vroumCoin >= 100){
			vroumCoinDiv.innerText = vroumCoin;
		}
		else if (10 <= vroumCoin && vroumCoin < 100){
			vroumCoinDiv.innerText = "0" + vroumCoin;
		}
		else if (vroumCoin >= 1) {
			vroumCoinDiv.innerText = "00" + vroumCoin;
		}
		else {
			vroumCoinDiv.innerText = "000";
		}
	}
	
	const buttonsContainer = document.getElementById('buttonsContainer');
	
	let chosenButtonIndex = null;
	
	const tileset = new Image();
	tileset.src = "../../assets/tilesets/circuit.png";
	
	tileset.onload = () => {
		
		for (let i = 0; i < map.getLargeur(); i++) {
			const canvas = document.createElement('canvas');
			canvas.width = 160
			canvas.height = 160
			
			const ctx = canvas.getContext('2d');
			
			canvas.id = "canvasVoiture";
			const tileSize = 160;
			//const rotation = 0;
			
			const tileX = i * tileSize;
			const tileY = 3 * 160;
			
			ctx.save();
			ctx.translate(0, 0);
			ctx.rotate(/*rotation[0][i]*/270 * Math.PI / 180);
			ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, -160, 0, canvas.width, canvas.height);
			ctx.restore();
			const container  = document.createElement('div');
			container.id ='divChoiceCar';
			const button  = document.createElement('button');
			const prix = document.createElement('p');
			prix.id = 'pCoin';
			if (listeButton[i].getValue() === -1){
				button.id 		  = 'buttonCarChosen';
				button.innerText = 'Utilisé';
			}
			if (listeButton[i].getValue() === 0){
				button.id 		  = 'buttonCar';
				button.innerText = 'Choisir';
				
			}
			if (listeButton[i].getValue() > 0 ){
				button.id 		  = 'buttonCarBuy';
				button.innerText = 'Acheter';
				prix.innerText   = listeButton[i].getValue();
				const coin = new Coin('../../assets/tilesets/circuit.png', pileVroum, rotationVroum);
				coin.dessinerPiece(prix);
			}
			
			button.onclick = () => {
				if (button.id === 'buttonCarChosen') return;
				
				if (button.id === 'buttonCar') {
					//mise a jour des bouton utilise en choisir
					for (let j = 0; j < map.getLargeur(); j++) {
						const otherContainer        = buttonsContainer.children[j];
						const otherButton = otherContainer.querySelector('button');
						
						if (otherButton.id === 'buttonCarChosen') {
							otherButton.id 		 = 'buttonCar';
							otherButton.innerText = 'Choisir';
							listeButton[j].setValue(0);
						}
					}
					button.id 		   = 'buttonCarChosen';
					button.innerText  = 'Utilisé';
					chosenButtonIndex = i;  // Stockez l'index du bouton "choisir"
					listeButton[i].setValue(-1);
					localStorage.setItem("kartId", ""+i);
				}
				
				let result = 0;
				
				if (button.id === "buttonCarBuy") {
					const controller = new ControllerVoiture(listeButton[i].getValue(), vroumCoin);
					result = controller.buttonPress();
					// suprime le prix une fois la voiture achetée !
					
					// Mise à jour du texte du bouton et de la quantité de vroumCoin
					if (result === 1) {
						button.id 		  = 'buttonCar';
						button.innerText = 'Choisir';
						vroumCoin = controller.getUpdatedVroumCoin(); // mise à jour la quantité de vroumCoin
						updateVroumCoin();
						prix.innerText="";
						
						listeButton[i].setValue(0);
					}
				}
			};
			container.appendChild(canvas);
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
};