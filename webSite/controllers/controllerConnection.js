import {API} from "/webSite/models/API";

const validateButton = document.getElementById("validFormConnection");
validateButton.addEventListener('click', () => {
	console.log("validateButton is clicked\n");
	
	const username = document.getElementById("username").value;
	const pwd 	   = document.getElementById("pwd").value;
	
	console.log(username+pwd);
	
	const url = API.getURLTryToConnect();
	let data = {
		pseudo  : username,
		password: pwd
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
	
	fetch(url, params)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			window.localStorage.setItem("success", 			 data.success);
			window.localStorage.setItem("isAlreadyRegister", data.isAlreadyRegister);
			window.localStorage.setItem("wrongPassword", 	 data.wrongPassWord);
			
			console.log(window.localStorage);
			console.log(window.localStorage.success);
			console.log(window.localStorage.isAlreadyRegister);
			console.log(window.localStorage.wrongPassword);
			
		})
		.catch(() => {
			console.log("Fetch error");
		})
});