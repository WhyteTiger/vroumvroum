// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import {API} from "../../models/API.js";
import {Alert} from "../../models/entities/Alert.js";

window.localStorage.setItem("alreadyRegister", "false");
window.localStorage.setItem("rightPassword",   "false");
window.localStorage.setItem("isConnected",     "false");
window.localStorage.setItem("playerId", 	 	  "0");
window.localStorage.setItem("username", 	 	  "");
window.localStorage.setItem("imgProfilId", 	  "");

async function tryToConnect(username, password) {
	
	const url = API.getURLTryToConnect();
	const data = {
		usernameIn: username,
		passwordIn: password
	};

	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	};
	
	await fetch(url, params)
		.then((response) => response.json())
		.then((data) => {
			
			localStorage.alreadyRegister = data.alreadyRegisterOut;
			localStorage.rightPassword   = data.rightPasswordOut;
			localStorage.playerId 		  = data.playerIdOut;
			localStorage.username 		  = data.usernameOut;
			localStorage.imgProfilId     = data.PPIdOut;
			
			if (localStorage.alreadyRegister === "true" && localStorage.rightPassword === "true") {
				localStorage.isConnected = true;
				document.location.href="../views/home.html";
			} else {
				if (localStorage.alreadyRegister === "false"){
					const newAlert = new Alert("Votre pseudo est incorrect !", "Fermer !", null , 'warning');
					newAlert.customAlert();
				}
				else if(localStorage.rightPassword === "false" && localStorage.alreadyRegister === "true"){
					const newAlert = new Alert("Votre mot de passe est incorrect !", "Fermer !", null , 'warning');
					newAlert.customAlert();
				}
			}
		})
		.catch(() => {
			console.error("Fetch failed");
		});
}

const form = document.getElementById("form");
form.addEventListener('submit', (event) => {
	event.preventDefault();
	
	const username = document.getElementById("username").value;
	const password = document.getElementById("pwd").value;
	
	tryToConnect(username, password);
});