import { API } from "../../models/API.js";
import { Alert } from "../../models/entities/Alert.js";

console.log('aside')
console.log(localStorage)
console.log(localStorage.isConnected)

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE "SO MANY" IF STATEMENTS */

if(document.querySelector('#savebutton') === null) {    // means we're on the choice page
	
	document.querySelector('#playbutton').addEventListener('click', (evt) => {
		document.location.href = 'playCircuit.html';
	});
	
} else {    // means we're on the creation page
	console.log(document.querySelector('#savebutton'))
	document.querySelector('#savebutton').addEventListener('click', (evt) => {
		
		console.log(document.querySelector('aside input').value)
		console.log(localStorage.playerId)
		
		const popUp = new Alert("Voulez vous sauvegarder votre circuit ?", "Sauvegarder", "", 'save');
		popUp.customAlert();

		console.log("melvyn")
		console.log(localStorage.getItem("creatorTime"))
		
		const playerIdIn    = localStorage.getItem("playerId");
		const matrixIn      = JSON.parse(localStorage.getItem('matrix'));
		const circuitNameIn = localStorage.getItem("circuitName");
		const creatorTimeIn = localStorage.getItem("creatorTime") === null ? 0 : localStorage.getItem("creatorTime");
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
		console.log(params);
		
		fetch(API.getURLpostCircuitOfPlayerId(), params)
			.then((response) => response.json())
			.then((dataCircuit) => {
				console.log(dataCircuit);
				if (dataCircuit.success === "true") {
					console.log("saved successfully");
				} else {
					console.error("saved error");
				}
			});
	});
}