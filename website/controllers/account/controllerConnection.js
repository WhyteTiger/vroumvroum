import {API} from "../../models/API.js";

window.localStorage.setItem("alreadyRegister", false);
window.localStorage.setItem("rightPassword",   false);
window.localStorage.setItem("isConnected",     false);
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
			window.localStorage.setItem("alreadyRegister", data.alreadyRegisterOut);
			window.localStorage.setItem("rightPassword",   data.rightPasswordOut);
			window.localStorage.setItem("username", 	 	  data.usernameOut);
			
			if (window.localStorage.alreadyRegister === "true" && window.localStorage.rightPassword === "true") {
				window.localStorage.isConnected = true;
				
				document.location.href="../views/home.html";
			} else {
				console.log("Connection failed");
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