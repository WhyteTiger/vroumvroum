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
	document.location.href = "choiceCircuit.html";
});

const createCircuit = document.getElementById("create");
createCircuit.addEventListener("click", () => {
	const playerId = window.localStorage.getItem("playerId");
	if( playerId === '0'){
		const newAlert = new Alert("Vous ne pouvez pas accerder à cette page si vous n'êtes pas connecté !", "Se Connecter");
		newAlert.customAlert();
	} else {
		document.location.href = "createCircuit.html";
	}
});

console.log( window.localStorage.getItem("playerId"));
const personalizeButton = document.getElementById("personalize");
personalizeButton.addEventListener("click", () => {
	const playerId = window.localStorage.getItem("playerId");
	if ( playerId === '0') {
		const newAlert = new Alert("Vous ne pouvez pas accerder à cette page si vous n'êtes pas connecté !", "Se Connecter","connection.html", 'warning');
		newAlert.customAlert();
	} else {
		document.location.href = "choiceKart.html";
	}
});