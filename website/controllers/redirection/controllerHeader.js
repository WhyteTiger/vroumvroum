
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
img.id = "logo";

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
	const bigdiv = document.createElement('div');
	bigdiv.id = 'burger-wrapper';

	const profileImg = document.createElement("img");
	profileImg.setAttribute("src", "TODO");
	profileImg.setAttribute("alt", "profile image");
	profileImg.id = "profileImg";
	bigdiv.appendChild(profileImg);

	const div = document.createElement('div');
	div.id = 'burger';

	const a1 = document.createElement('a');
	a1.textContent = 'Mon compte';
	a1.id = 'a-acc';
	a1.addEventListener('click', () => {
		document.location.href = 'account.html';
	});
	div.appendChild(a1);

	const a2 = document.createElement('a');
	a2.textContent = 'Mes circuits';
	a2.id = 'a-circ';
	a2.addEventListener('click', () => {
		localStorage.setItem('personal', 'true');
		document.location.href = 'choiceCircuit.html';
	});
	div.appendChild(a2);

	const a3 = document.createElement('a');
	a3.textContent = 'Déconnexion';
	a3.id = 'a-acc';
	a3.addEventListener('click', () => {
		localStorage.setItem('isConnected', 'false');
		document.location.href = 'home.html';
	});
	div.appendChild(a3);

	bigdiv.appendChild(div);
	header.appendChild(bigdiv);

	profileImg.addEventListener('click', (evt) => {
		document.querySelector('#burger').classList.toggle('visible');
	});

	window.onclick = (evt) => {
		if(evt.target.id !== "burger-wrapper" && evt.target.id !== "profileImg") document.querySelector('#burger').classList.remove('visible')
	};


}

// ajout header
document.body.insertBefore(header, document.querySelector('main'));