import { API }   from "../../models/API.js";
import { Alert } from "../../models/entities/Alert.js";

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE "SO MANY" IF STATEMENTS */

if (document.querySelector('#savebutton') === null) {    // means we're on the choice page
	console.log("document.querySelector('#savebutton') === null");

	document.querySelector('#playbutton').addEventListener('click', () => {
		localStorage.setItem("personal", "false");
		location.href = 'playCircuit.html';
	});

} else if (localStorage.getItem("isChecked") === "false") { // means we're on the creation page and circuit isn't checked
	console.log("localStorage.getItem(\"isChecked\") === \"false\"");
	
	document.querySelector('#savebutton').addEventListener('click', () => {
		
		let circuitIsValid = "false";
		const matrix = JSON.parse(localStorage.getItem("matrix"));
		
		console.log("matrix : "+ matrix);
		
		const len = matrix[0].length;
		for (let i = 0; i < len; i++) {
			console.log(matrix[0][i] +" ?== '7' || "+ matrix[0][i] +" ?== '12'");
			if (matrix[0][i] === 7 || matrix[0][i] === 12) {
				console.log("LLAAAAAAAAAAAAAAAA");
				circuitIsValid = "true";
				i = len; // break
			}
		}
		
		if (circuitIsValid === "true") {
			console.log("Le circuit est valide");
			const popUp = new Alert("Voulez vous sauvegarder votre circuit ?", "Sauvegarder", "playCircuit.html", 'save');
			popUp.customAlert();
		} else {
			console.log("Le circuit n'est pas valide");
			const popUp = new Alert("Votre circuit n'est pas valid, veuillez metre au moins un départ/arrivé", "OK", "", 'warning');
			popUp.customAlert();
		}
	});
	
} else if (localStorage.getItem("isChecked") === "true") { // means we're on the creation page and circuit is checked
	console.log("localStorage.getItem(\"isChecked\") === \"true\"");
	
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
				const popUpSuccess = new Alert("Votre circuit a bien été sauvegardé", "OK", "", 'info');
				popUpSuccess.customAlert();
			} else {
				console.error("saved error");
			}
			
			localStorage.setItem("circuitName", "");
			localStorage.setItem("creatorTime", "");
			localStorage.setItem("circuitLaps", "");
			localStorage.setItem("isChecked", "false");
		});
} else {
	console.log("Error controllerAside : Nothing good");
}