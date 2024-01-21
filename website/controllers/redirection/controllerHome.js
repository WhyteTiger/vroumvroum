import {Alert} from "../../models/entities/Alert.js";

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/homeMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();

const mainLogo = document.getElementById("mainLogo");
mainLogo.addEventListener("click", () => {
	const vroumAudio = document.createElement("audio");
	vroumAudio.src 	= "../../assets/soundtrack/vroum2.mp3";
	vroumAudio.volume = 0.0512;
	vroumAudio.play();
});

const playButton = document.getElementById("play");
playButton.addEventListener("click", () => {
	localStorage.setItem("personal", false);
	localStorage.setItem("test", false);
	document.location.href = "choiceCircuit.html";
});

const createCircuit = document.getElementById("create");
createCircuit.addEventListener("click", () => {
	localStorage.setItem("personal", false);
	const playerId = window.localStorage.getItem("playerId");
	if( playerId === '0'){
		const newAlert = new Alert("Vous ne pouvez pas accéder à cette page si vous n'êtes pas connecté !", "Se connecter", "connection.html" , 'warning');
		newAlert.customAlert();
	} else {
		document.location.href = "createCircuit.html";
	}
});

const personalizeButton = document.getElementById("personalize");
personalizeButton.addEventListener("click", () => {
	const playerId = window.localStorage.getItem("playerId");
	if ( playerId === '0') {
		const newAlert = new Alert("Vous ne pouvez pas accéder à cette page si vous n'êtes pas connecté !", "Se connecter","connection.html", 'warning');
		newAlert.customAlert();
	} else {
		document.location.href = "choiceKart.html";
	}
});