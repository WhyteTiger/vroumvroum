
// ajout balises script et link en en-tête
const head = document.querySelector('head');
const link = document.createElement('link');

link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', 'styles/headerStyle.css');
head.appendChild(link);

const isConnected = window.localStorage.isConnected;
const header = document.createElement("header");

const a = document.createElement('a');
a.setAttribute("href", "home.html");

const img = document.createElement('img');
img.setAttribute("src", "../../assets/logoLong.png");

a.appendChild(img);
header.appendChild(a);

if (isConnected === "false") {
	
	const divButtons 	   = document.createElement("div");
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
	
	divButtons.appendChild(connectionA);
	divButtons.appendChild(registrationA);
	
	header.appendChild(divButtons);
	
} else {
	const profileImg = document.createElement("img");
	profileImg.setAttribute("src", "TODO");
	profileImg.setAttribute("alt", "profile image");
	profileImg.id = "profileImg";
	
	header.appendChild(profileImg);
}

// ajout header
document.body.insertBefore(header, document.querySelector('main'));