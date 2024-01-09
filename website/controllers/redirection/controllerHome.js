import {Alert} from "../../models/entities/Alert.js";

document.getElementsByTagName("audio")[0].volume = 0.0512;

const playButton = document.getElementById("play");
playButton.addEventListener("click", () => {
	document.location.href = "choiceCircuit.html";
});

const createCircuit = document.getElementById("create");
createCircuit.addEventListener("click", () => {
	const playerId = window.localStorage.getItem("playerId");
	if( playerId === '0'){
		const newAlert = new Alert("Vous ne pouvez pas accerder à cette page si vous n'êtes pas connecté !", "Se Connecter", "connection.html" , 'warning');
		newAlert.customAlert();
	}else {
		document.location.href = "createCircuit.html";
	}
});

console.log( window.localStorage.getItem("playerId"));
const personalizeButton = document.getElementById("personalize");
personalizeButton.addEventListener("click", () => {
	const player = window.localStorage.getItem("playerId");
	if( player === '0'){
		const newAlert = new Alert("Vous ne pouvez pas accerder à cette page si vous n'êtes pas connecté !", "Se Connecter","connection.html", 'warning');
		newAlert.customAlert();
	}else {
		document.location.href = "choiceKart.html";
	}
});