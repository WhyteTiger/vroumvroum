import {API} from "../../models/API.js";
import {Alert} from "../../models/entities/Alert.js";

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/connectionMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();


async function wantToRegistrate(nickname, password) {
	
	const url = API.getURLWantToRegistrate();
	const data = {
		nicknameIn: nickname,
		passwordIn: password
	}
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	}
	
	await fetch(url, params)
		.then((response) => response.json())
		.then((data) => {
			localStorage.alreadyRegister = data.alreadyRegisterOut;
			
			if (localStorage.alreadyRegister === "false" || localStorage.alreadyRegister === undefined) {
				localStorage.isConnected = "true";
				localStorage.playerId    = data.playerIdOut;
				localStorage.username    = data.usernameOut;
				localStorage.imgProfilId = data.PPIdOut;
				if(localStorage.getItem("hasATime") !== undefined) {
					score = 1;
					let url = API.getURLupdateBestTimeOfCircuitByPlayerId();
					const dataPlayer = {
						playerIdIn : data.playerIdOut,
						circuitIdIn : localStorage.getItem("circuitIdNoAccount"),
						newBestTimeIn : localStorage.getItem("bestTimeNoAccount")
					};
					const params = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(dataPlayer)
					};
					console.log(params);
					
					fetch(url, params)
						.then((response) => response.json())
						.then((dataPlayer) => {
							console.log(dataPlayer.success);
						}).catch(() => {
								console.log("Fetch failed");
						});
				}
				document.location.href="../views/home.html";
			} else {
				console.log("nickname is already used");
				const newAlert = new Alert("Ce pseudo est déjà utilisé !",  "Fermer !", null, "warning");
				newAlert.customAlert();
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
	
	const nickname   		 = document.getElementById("nickname").value;
	const password 		 = document.getElementById("pwd").value;
	const confirmPassword = document.getElementById("confpwd").value;
	
	if (password === confirmPassword && password !== "") {
		wantToRegistrate(nickname, password);
		
	} else {
		console.log("confpwd is not equal to password");
		const newAlert = new Alert("Attention, les mots de passe ne sont pas les mêmes !",  "Fermer !", null, "warning");
		newAlert.customAlert();
	}
});