import {API} from "../models/API.js";

console.log("Hello\n");

async function tryToConnect(username, password) {
	//const url = API.getURLTryToConnect();
	const url = 'http://localhost:8080/connection/tryToConnect';
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
			window.localStorage.setItem("success", 			 data.successOut);
			window.localStorage.setItem("isAlreadyRegister", data.isAlreadyRegisterOut);
			window.localStorage.setItem("rightPassword", 	 data.rightPassWordOut);
			window.localStorage.setItem("username", 	 		 data.usernameOut);
			
			console.log(window.localStorage);
			console.log(window.localStorage.success);
			console.log(window.localStorage.isAlreadyRegister);
			console.log(window.localStorage.rightPassword);
			console.log(window.localStorage.username);
			
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