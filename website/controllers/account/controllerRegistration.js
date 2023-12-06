import {API} from "../../models/API.js";

window.localStorage.setItem("isConnected",     false);
window.localStorage.setItem("username", 	     "");
window.localStorage.setItem("alreadyRegister", "");

async function whantToRegistrate(nickname, password) {
	
	const url = API.getURLWhantToRegistrate();
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
			window.localStorage.alreadyRegister = data.alreadyRegisterOut;
			
			if (window.localStorage.alreadyRegister === "false") {
				window.localStorage.isConnected = true;
				window.localStorage.playerId    = data.playerIdOut;
				window.localStorage.username    = data.usernameOut;
				
				document.location.href="../views/home.html";
				return;
			}
			console.log("nickname is already used");
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
		whantToRegistrate(nickname, password);
		
	} else {
		console.log("confpwd is not equal to password");
	}
});