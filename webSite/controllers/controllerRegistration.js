import {API} from "../models/API.js";

const buttonToRegistrate = document.getElementById("validFormRegistration");

buttonToRegistrate.addEventListener("click", () => {
	
	console.log("buttonToRegistrate is clicked")
	
	const nickname = document.getElementById("nickname").value;
	const password = document.getElementById("pwd").value;
	
	console.log(username+passWord);
	
	const url = API.urlTryToConnect();
	let data = {
		pseudo   : username,
		password : password
	}
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	}
	
	console.log(url, params);
	
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
			
			let isConnected = data.success && data.isAlreadyRegister && !data.wrongPassWord;
			
			if (isConnected) {
				window.localStorage.setItem("pseudo", username);
				document.location.href="../views/index.php";
			}
			
		})
		.catch(() => {
			console.log("Fetch error");
		})
})