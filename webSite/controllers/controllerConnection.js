import {API} from "../models/API.js";

console.log("Hello\n");

window.localStorage.setItem("success", 		  false);
window.localStorage.setItem("alreadyRegister", false);
window.localStorage.setItem("rightPassword",   false);
window.localStorage.setItem("username", 	 	  "");

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
			window.localStorage.setItem("success", 		  data.successOut);
			window.localStorage.setItem("alreadyRegister", data.alreadyRegisterOut);
			window.localStorage.setItem("rightPassword",   data.rightPasswordOut);
			window.localStorage.setItem("username", 	 	  data.usernameOut);
			
			console.log(window.localStorage);
			console.log("isSuccess ? " 		  + window.localStorage.success);
			console.log("isAlreadyRegister ? " + window.localStorage.alreadyRegister);
			console.log("isRightPassword ? "   + window.localStorage.rightPassword);
			console.log("pseudo "				  + window.localStorage.username);
			
			if (window.localStorage.alreadyRegister === true && window.localStorage.rightPassword === true) {
				console.log("is connected");
				document.location.href="../views/index.php";
			} else {
				console.log("is not connected");
			}
		})
		.catch(() => {
			console.log("Fetch error");
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