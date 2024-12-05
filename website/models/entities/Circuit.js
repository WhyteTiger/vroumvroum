import { Circuits } from "./Circuits.js";

export class Circuit {
	static circuitIdTotal = 0; // Suivi global des IDs
	circuitId;
	circuitName  = "";
	creatorName    = null;
	circuitScore= 0;
	creatorTime = 0;
	leaderBoard   = [];
	circuitLaps = 1;
	matrix;
	
	constructor(circuitName, creatorName, creatorTime, circuitLaps, matrix) {
		let circuitIdTotal = Number(localStorage.getItem("circuitIdTotal"));
		circuitIdTotal += 1;
		this.circuitId = circuitIdTotal;
		localStorage.setItem("circuitIdTotal", ""+circuitIdTotal);
		
		this.circuitName = circuitName;
		this.creatorName = creatorName;
		this.creatorTime = creatorTime;
		this.circuitLaps = circuitLaps;
		this.matrix = matrix;
	}
	
	// Convertir une instance en un objet sérialisable (JSON)
	toJSON() {
		return {
			circuitId: this.circuitId,
			circuitName: this.circuitName,
			creatorName: this.creatorName,
			creatorTime: this.creatorTime,
			circuitScore: this.circuitScore,
			circuitLaps: this.circuitLaps,
			leaderBoard: this.leaderBoard,
			matrix: this.matrix,
		};
	}
	
	// Recréer une instance de Circuit à partir d'un objet JSON
	static fromJSON(data) {
		const circuit = new Circuit(
			data.circuitName,
			data.creatorName,
			data.creatorTime,
			data.circuitLaps,
			data.matrix
		);
		circuit.circuitScore = data.circuitScore || 0;
		circuit.leaderBoard  = data.leaderBoard  || [];
		return circuit;
	}
	
	edit(matrix, creatorTime, circuitLaps, circuitName) {
		// Mise à jour des propriétés de l'objet Circuit
		this.matrix = matrix;
		this.creatorTime = creatorTime;
		this.circuitLaps = circuitLaps;
		this.circuitName = circuitName;
		this.leaderBoard = [];
		this.circuitScore = 0;
		
		// Mettre à jour le circuit dans la liste Circuits
		Circuits.loadFromStorage(); // Charger les données existantes avant la modification
		
		// Trouver et mettre à jour le circuit dans Circuits.circuitList
		const index = Circuits.circuitList.findIndex(circuit => circuit.circuitId === this.circuitId);
		if (index !== -1) {
			Circuits.circuitList[index] = this; // Remplacer le circuit modifié dans la liste
		}
		
		// Sauvegarder la liste des circuits après modification
		Circuits.saveToStorage();
	}
	
	export() {
		const content = this.toJSON();
		const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content));
		const downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href",     dataStr);
		downloadAnchorNode.setAttribute("download", this.circuitName + ".json");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}
	
	
	getCircuitId() {
		return this.circuitId;
	}
	getCircuitName() {
		return this.circuitName;
	}
	getCreatorName() {
		return this.creatorName;
	}
	getCreatorTime() {
		return this.creatorTime;
	}
	getCircuitLaps() {
		return this.circuitLaps;
	}
	getCircuitScore() {
		return this.circuitScore;
	}
	getLeaderBoard() {
		return this.leaderBoard;
	}
	getMatrix() {
		return this.matrix;
	}
}