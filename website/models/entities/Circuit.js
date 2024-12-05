export class Circuit {
	static circuitIdTotal = 0;
	circuitId;
	circuitName = "";
	creatorName = null;
	creatorTime = 0;
	circuitLaps = 1;
	matrix;
	
	constructor(circuitName, creatorName, creatorTime, circuitLaps, matrix) {
		Circuit.circuitIdTotal++;
		this.circuitId = Circuit.circuitIdTotal;
		
		this.circuitName = circuitName;
		this.creatorName = creatorName;
		this.creatorTime = creatorTime;
		this.circuitLaps = circuitLaps;
		this.matrix      = matrix;
	}
	
	parse() {
		let circuit = "[\n";
		for (let h = 0; h < 2; h++) {
			if (h === 1) {
				circuit += "\t";
			}
			circuit += "[\n";
			for (let i = 0; i < this.matrix[h].length; i++) {
				if (i%8 === 0) {
					circuit += "\t\t["
				}
				circuit += ""+this.matrix[h][i];
				if (i%8 === 7) {
					circuit += "]";
					if (i < this.matrix[h].length-8) {
						circuit += ",";
					}
					circuit += "\n";
				} else {
					circuit += ", ";
				}
			}
			circuit += "\t]";
			if (h === 0) {
				circuit += ",";
			}
			circuit += "\n";
		}
		circuit += "\n]";
		
		return "{\n" +
			"\t\"circuitName\": \""+ this.circuitName +"\",\n"+
			"\t\"circuitId\":   \""+ this.circuitId   +"\",\n"+
			"\t\"creatorName\": \""+ this.creatorName  +"\",\n"+
			"\t\"creatorTime\": \""+ this.creatorTime +"\",\n"+
			"\t\"circuitLaps\": \""+ this.circuitLaps +"\",\n"+
			"\t\"circuit\":       "+ circuit     +"\n" +
			"}";
	}
	
	getCircuitId() {
		return this.circuitId;
	}
}