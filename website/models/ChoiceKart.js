// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import {Tileset} from "./entities/Tileset.js";
import {Map} from "./entities/Map.js";
import {ControllerVoiture} from "../controllers/gameplay/controllerVoiture.js";
import {ButtonKart} from "./entities/ButtonKart.js";
import {Coin} from './entities/Coin.js';
import {API} from "./API.js";

let listeButton;
let vroumCoin;

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
	
	const playerId = window.localStorage.playerId;
	const url = API.getURLgetKartsAndCoinsByPlayerId();
	const dataPlayer = {
		playerIdIn: playerId
	};
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataPlayer)
	};
	
	fetch(url, params)
		.then((response) => response.json())
		.then((dataKarts) => {
			
			const valButtonInit = dataKarts.resultPrice;
			vroumCoin = dataKarts.vroumCoins;
			
			// création des bouttons qui vont contenir la valeur de la voiture vis à vis des joueurs.
			function creationButton() {
				
				const listeButton = [];
				for (let i = 0; i < map.getLargeur(); i++) {
					
					listeButton.push(new ButtonKart(valButtonInit[i]));
				}
				
				return listeButton;
			}
			listeButton = creationButton();
			
			const canvas = document.getElementById('canvasChoix');
			const ctx = canvas.getContext('2d');
			
			canvas.width  = map.getLargeur()*160;
			canvas.height = map.getHauteur()*160;
			
			map.dessinerKart(ctx, carte, rotation);
			
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
			
			for (let i = 0; i < map.getLargeur(); i++) {
				const container  = document.createElement('div');
				container.id ='divChoixCar';
				const button  = document.createElement('button');
				const prix = document.createElement('p');
				prix.id = 'pCoin';
				if (listeButton[i].getValue() === -1){
					button.id 		  = 'buttonCarChoisi';
					button.innerText = 'utilise';
				}
				if (listeButton[i].getValue() === 0){
					button.id 		  = 'buttonCar';
					button.innerText = 'choisir';
					
				}
				if (listeButton[i].getValue() > 0 ){
					button.id 		  = 'buttonCarAchat';
					button.innerText = 'Acheter';
					prix.innerText   = listeButton[i].getValue();
					const coin = new Coin('../../assets/tilesets/circuit.png', pileVroum, rotationVroum);
					coin.dessinerPiece(prix);
				}
				
				button.onclick = () => {
					if(button.id === 'buttonCarChoisi'){
						return;
					}
					
					if(button.id === 'buttonCar'){
						//mise a jour des bouton utilise en choisir
						for (let j = 0; j < map.getLargeur(); j++) {
							const otherContainer        = buttonsContainer.children[j];
							const otherButton = otherContainer.querySelector('button');

							if (otherButton.id === 'buttonCarChoisi') {
								otherButton.id 		 = 'buttonCar';
								otherButton.innerText = 'choisir';
								listeButton[j].setValue(0);
							}
						}
						button.id 		   = 'buttonCarChoisi';
						button.innerText  = 'utilise';
						chosenButtonIndex = i;  // Stockez l'index du bouton "choisir"
						listeButton[i].setValue(-1);
					}
					
					let result = 0;
					
					if (button.id === "buttonCarAchat"){
						const controller = new ControllerVoiture(listeButton[i].getValue(), vroumCoin);
						result = controller.buttonPress();
						// suprime le prix une fois la voiture achetée !
						
						// Mise à jour du texte du bouton et de la quantité de vroumCoin
						if (result === 1) {
							button.id 		  = 'buttonCar';
							button.innerText = 'choisir';
							vroumCoin = controller.getUpdatedVroumCoin(); // mise à jour la quantité de vroumCoin
							updateVroumCoin();
							prix.remove();
							listeButton[i].setValue(0);
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
		});
};

window.onunload = () => {
	
	const tabInfo = [];
	for (let i = 0; i < listeButton.length; i++) {
		tabInfo.push(listeButton[i].getValue());
	}
	
	const url = API.getURLpostKartsAndCoinsInformationOfPlayerId();
	
	const playerId = window.localStorage.playerId;
	const dataKarts = {
		playerIdIn:   playerId,
		tabInfoIn:    tabInfo,
		vroumCoinsIn: vroumCoin
	};
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dataKarts)
	};
	
	fetch(url, params)
		.then((response) => response.json())
		.then((result) => {
			if (result.success !== "true"){
				console.error("postKartsAndCoinsInformationOfPlayerId Failed");
			}
		})
		.catch((err) => {
			console.error(err);
		})
};