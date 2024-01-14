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
		
		/*
		const playerIdIn    = localStorage.playerId;
		const matrixIn      = JSON.parse(localStorage.getItem('matrix'));
		const circuitNameIn = localStorage.circuitName;
		const creatorTimeIn = localStorage.creatorTime;
		const circuitLapsIn = localStorage.circuitLaps;
		
		const url = API.getURLpostCircuitOfPlayerId();
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
		
		fetch(url, params)
			.then((response) => response.json())
			.then((dataCircuit) => {
				console.log(dataCircuit);
				if (dataCircuit[0].success === "true") {
					console.log("saved successfully");
				} else {
					console.error("saved error");
				}
			});
			
		 */
	});
}