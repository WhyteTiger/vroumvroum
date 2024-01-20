import { API } from "../../models/API.js";
import { Alert } from "../../models/entities/Alert.js";

/* NOTE : THIS SCRIPT APPLIES TO ALL ASIDES IN THE APP, EXPLAINING WHY THERE ARE "SO MANY" IF STATEMENTS */

if(document.querySelector('#savebutton') === null) {    // means we're on the choice page

	// when not personal
	document.querySelector('#playbutton').addEventListener('click', (evt) => {
		document.location.href = 'playCircuit.html';
	});

	// when personal
	document.querySelector('#play-button').addEventListener('click', (evt) => {
		document.location.href = 'playCircuit.html';
	});

	// delete a circuit
	document.getElementById('delete-button').addEventListener('click', (evt) => {

		console.log(localStorage)
		const fetchParams = {
			circuitIdIn : localStorage.getItem('circuitId')
		};
		const params = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(fetchParams)
		};
		
		fetch(API.getURLDeleteCircuit(), params)
		.then((response) => response.json())
		.then((dataDelete) => {
			if (dataDelete.success === "true") {
				console.log("deleted successfully");
				document.location.href = 'choiceCircuit.html';
			} else {
				console.error("deletion error");
			}
		});

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