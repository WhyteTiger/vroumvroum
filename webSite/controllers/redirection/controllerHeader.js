
const isConnected = window.localStorage.isConnected;
const header = document.body.getElementsByTagName("header")[0];

if (isConnected === "false") {
	const connectionA      = document.createElement("a");
	const connectionButton = document.createElement("button");
	
	const registrationA      = document.createElement("a");
	const registrationButton = document.createElement("button");
	
	connectionButton.id 			= "connection";
	connectionButton.innerText = "Connexion";
	connectionA.setAttribute("href", "connection.html");
	connectionA.appendChild(connectionButton);
	
	registrationButton.id 		  = "register";
	registrationButton.innerText = "Inscription";
	registrationA.setAttribute("href", "registration.html");
	registrationA.appendChild(registrationButton);
	
	header.appendChild(connectionA);
	header.appendChild(registrationA);
	
} else {
	const profileImg = document.createElement("img");
	profileImg.setAttribute("src", "TODO");
	profileImg.setAttribute("alt", "profile image");
	profileImg.id = "profileImg";
	
	header.appendChild(profileImg);
}