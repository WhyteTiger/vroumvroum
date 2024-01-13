import {API} from "../../models/API.js";

console.log('aside')
console.log(localStorage)
console.log(localStorage.isConnected)

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE SO MANY IF STATEMENTS */

if(document.querySelector('#savebutton') === null) {    // means we're on the choice page
	
	document.querySelector('#playbutton').addEventListener('click', (evt) => {
		document.location.href = 'playCircuit.html';
	});
	
} else {    // means we're on the creation page
	console.log(document.querySelector('#savebutton'))
	document.querySelector('#savebutton').addEventListener('click', (evt) => {
		
		console.log(document.querySelector('aside input').value)
		console.log(localStorage.playerId)
		
		// TODO API : enregistrer le fichier avec l'id de l'user et matrix (à transformer au passage pour que ça rentre dans la DB)
		
		
	});
}