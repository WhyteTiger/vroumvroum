import {API} from "../models/API.js";
import {User} from "../models/entities/User.js";

window.localStorage.setItem("isConnected", false);
window.localStorage.setItem("username", 	 "");

async function whantToRegistrate(nickname, password) {
	
	const url = API.getURLWhantToRegistrate();
	const data = {
		nicknameIn: nickname,
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
			
			if (!data.alreadyRegisterOut) {
				window.localStorage.isConnected = true;
				window.localStorage.username    = data.usernameOut;
				console.log(window.localStorage.username);
				
				document.location.href="../views/index.php";
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
	
	if (password === confirmPassword) {
		whantToRegistrate(nickname, password);
		
	} else {
		console.log("confpwd is not equal to password");
	}
});