import {API} from "../../models/API.js";

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
			
			if (localStorage.alreadyRegister === "false") {
				localStorage.isConnected = "true";
				localStorage.playerId    = data.playerIdOut;
				localStorage.username    = data.usernameOut;
				localStorage.imgProfilId = data.PPIdOut;
				
				document.location.href="../views/home.html";
			} else {
				console.log("nickname is already used");
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
	}
});