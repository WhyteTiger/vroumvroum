import { API } from "../../models/API.js";
import { Alert } from "../../models/entities/Alert.js";

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE "SO MANY" IF STATEMENTS */

if(document.querySelector('#savebutton') === null) {    // means we're on the choice page

	document.querySelector('#playbutton').addEventListener('click', (evt) => {
		document.location.href = 'playCircuit.html';
	});

} else {    // means we're on the creation page
	document.querySelector('#savebutton').addEventListener('click', (evt) => {
		localStorage.setItem('test', true);
		document.location.href = 'playCircuit.html';
	});
}




// récupération du nom entré dans la pop-up
const nameCircuit = window.localStorage.inputField;
console.log(nameCircuit);