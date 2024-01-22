import {API} from "../../models/API.js";
import {Alert} from "../../models/entities/Alert.js";

window.localStorage.setItem("alreadyRegister", "false");
window.localStorage.setItem("rightPassword",   "false");
window.localStorage.setItem("isConnected",     "false");
window.localStorage.setItem("playerId", 	 	  "0");
window.localStorage.setItem("username", 	 	  "");
window.localStorage.setItem("imgProfilId", 	  "");

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/connectionMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();

async function tryToConnect(username, password) {
	
	const url = API.getURLTryToConnect();
	const data = {
		usernameIn: username,
		passwordIn: password
	}
	console.log(data);
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	}
	
	console.log(params);
	
	await fetch(url, params)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			console.log(data.alreadyRegisterOut +" "+ data.rightPasswordOut +" "+ data.playerIdOut +" "+ data.usernameOut +" "+ data.PPIdOut);
			
			localStorage.alreadyRegister = data.alreadyRegisterOut;
			localStorage.rightPassword   = data.rightPasswordOut;
			localStorage.playerId 		  = data.playerIdOut;
			localStorage.username 		  = data.usernameOut;
			localStorage.imgProfilId     = data.PPIdOut;
			
			if (localStorage.alreadyRegister === "true" && localStorage.rightPassword === "true") {
				localStorage.isConnected = true;
				
				document.location.href="../views/home.html";
			} else {
				console.log("Connection failed");
				console.log(localStorage.rightPassword && localStorage.rightPassword === "true");
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
			console.log("Fetch failed");
		})
}

const form = document.getElementById("form");
form.addEventListener('submit', (event) => {
	event.preventDefault();
	console.log("form submit\n");
	
	const username = document.getElementById("username").value;
	const password = document.getElementById("pwd").value;
	console.log(username+" "+password);
	
	tryToConnect(username, password);
});