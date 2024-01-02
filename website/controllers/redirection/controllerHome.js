import {Alert} from "../../models/entities/Alert.js";

const playButton = document.getElementById("play");
playButton.addEventListener("click", () => {
	document.location.href = "choiceCircuit.html";
});

const createCircuit = document.getElementById("create");
createCircuit.addEventListener("click", () => {
	const playerId = window.localStorage.getItem("playerId");
	if( playerId === '0'){
		const newAlert = new Alert("Vous ne pouvez pas accerder à cette page si vous n'êtes pas connecté !", "Se Connecter");
		newAlert.customAlert();
	}else {
		//mettre ici le lien a la page
		//document.location.href = ".html";
	}
});

const personalizeButton = document.getElementById("personalize");
personalizeButton.addEventListener("click", () => {
	const player = window.localStorage.getItem("playerId");
	if( player === '0'){
		const newAlert = new Alert("Vous ne pouvez pas accerder à cette page si vous n'êtes pas connecté !", "Se Connecter");
		newAlert.customAlert();
	}else {
		document.location.href = "choiceKart.html";
	}
});