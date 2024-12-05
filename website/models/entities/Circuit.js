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
		Circuit.circuitIdTotal++;
		this.circuitId = Circuit.circuitIdTotal;
		
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
		circuit.circuitId = data.circuitId; // Restaurer l'ID unique
		Circuit.circuitIdTotal = Math.max(Circuit.circuitIdTotal, data.circuitId); // Maintenir l'ID global
		circuit.circuitScore = data.circuitScore || 0;
		circuit.leaderBoard = data.leaderBoard || [];
		return circuit;
	}

	edit(matrix, creatorTime, circuitLaps, creatorName) {
		this.matrix = matrix;
		this.creatorTime = creatorTime;
		this.circuitLaps = circuitLaps;
		this.creatorName = creatorName;
		this.leaderBoard = [];
		this.circuitScore = 0;
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