// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { API }   from "../../models/API.js";
import { Alert } from "../../models/entities/Alert.js";

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE "SO MANY" IF STATEMENTS */

if (document.querySelector('#savebutton') === null) {// means we're on the choice page to play

	document.querySelector('#playbutton').addEventListener('click', () => {
		localStorage.setItem("personal", "false");
		location.href = 'playCircuit.html';
	});

} else { // means we're on the choice page to create
	document.getElementById('modify-button').addEventListener('click', () => {
		localStorage.setItem("modify", "true");
		document.location.href = 'createCircuit.html';
	});
	
	// when personal
	document.querySelector('#play-button').addEventListener('click', () => {
		localStorage.setItem("personal", "true");
		document.location.href = 'playCircuit.html';
	});
	
	// delete a circuit
	document.getElementById('delete-button').addEventListener('click', () => {
		
		const fetchParams = {
			circuitIdIn : localStorage.getItem('circuitId')
		};
		const params = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(fetchParams)
		};
		
		fetch(API.getURLDeleteCircuit(), params)
			.then((response) => response.json())
			.then((dataDelete) => {
				if (dataDelete.success === "true") {
					localStorage.setItem("modify", "false");
					document.location.href = 'choiceCircuit.html';
				} else {
					console.error("deletion error");
				}
			});
		
	});
	
	if (localStorage.getItem("isChecked") === "false") { // means we're on the creation page and circuit isn't checked
		
		document.querySelector('#savebutton').addEventListener('click', () => {
			
			let circuitIsValid = "false";
			
			let matrix;
			if(localStorage.getItem('personal') === 'true') matrix = JSON.parse(localStorage.getItem('matrixPerso'));
			else matrix = JSON.parse(localStorage.getItem('matrix'));
			
			const len = matrix[0].length;
			for (let i = 0; i < len; i++) {
				if (matrix[0][i] === 7 || matrix[0][i] === 12) {
					circuitIsValid = "true";
					i = len; // break
				}
			}
			if (circuitIsValid === "true") {
				localStorage.setItem("matrix", JSON.stringify(matrix));
				const popUp = new Alert("Voulez vous sauvegarder votre circuit ?", "Sauvegarder", "playCircuit.html", 'save');
				popUp.customAlert();
			} else {
				const popUp = new Alert("Votre circuit n'est pas valid, veuillez metre au moins un départ/arrivé", "OK", "", 'warning');
				popUp.customAlert();
			}
		});
		
	} else if (localStorage.getItem("isChecked") === "true") { // means we're on the creation page and circuit is checked
		
		const matrixIn = JSON.parse(localStorage.getItem('matrix'));
		const playerIdIn    = localStorage.getItem("playerId");
		const circuitNameIn = localStorage.getItem("circuitName");
		const creatorTimeIn = localStorage.getItem("creatorTime");
		const circuitLapsIn = localStorage.getItem("circuitLaps");
		
		const dataCircuit = {
			playerIdIn,
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
		
		fetch(API.getURLpostCircuitOfPlayerId(), params)
			.then((response) => response.json())
			.then((dataCircuit) => {
				if (dataCircuit.success === "true") {
					const popUpSuccess = new Alert("Votre circuit a bien été sauvegardé", "OK", "", 'info');
					popUpSuccess.customAlert();
				} else {
					console.error("saved error");
				}
				
				localStorage.setItem("circuitName", "");
				localStorage.setItem("creatorTime", "");
				localStorage.setItem("circuitLaps", "");
				localStorage.setItem("isChecked",   "false");
			});
	} else {
		console.error("Error controllerAside : Nothing good");
	}
}