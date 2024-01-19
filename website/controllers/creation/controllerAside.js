import { API } from "../../models/API.js";
import { Alert } from "../../models/entities/Alert.js";

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE "SO MANY" IF STATEMENTS */

if (document.querySelector('#savebutton') === null) {    // means we're on the choice page

	document.querySelector('#playbutton').addEventListener('click', () => {
		localStorage.setItem("personal", "false");
		location.href = 'playCircuit.html';
	});

} else if (localStorage.getItem("isChecked") === "false") { // means we're on the creation page and circuit isn't checked
	document.querySelector('#savebutton').addEventListener('click', () => {
		
		const popUp = new Alert("Voulez vous sauvegarder votre circuit ?", "Sauvegarder", "playCircuit.html", 'save');
		popUp.customAlert();
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
				console.log("saved successfully");
			} else {
				console.error("saved error");
			}
			
			localStorage.setItem("circuitName", "");
			localStorage.setItem("creatorTime", "");
			localStorage.setItem("circuitLaps", "");
		});
}


/*
// récupération du nom entré dans la pop-up
const nameCircuit = localStorage.inputField;
console.log(nameCircuit);
 */