import { Circuit } from "./Circuit.js";

export class Circuits {
	static circuitList = null;
	
	static init() {
		this.circuitList = [];
		//const circuit1 = Circuit.import("asset/ciruits/circuit1.json");
		//Circuits.circuitList.push(circuit1);
	}
	
	static isEmpty() {
		if (this.circuitList === null) {
			return "true";
		}
		return "false";
	}
	
	static add(circuit) {
		this.circuitList.push(circuit);
	}
	
	static remove(circuitId) {
		let circuitToRemoveIndex = -1
		for (const circuit in this.circuitList) {
			if (circuit.getCircuitId() === circuitId) {
				const circuitToRemoveIndex = this.circuitList.indexOf(circuitId);
				this.circuitList.splice(circuitToRemoveIndex, 1);
				return circuitToRemoveIndex;
			}
		}
		return circuitToRemoveIndex;
	}
	
	static get(circuitId) {
		let result = null;
		for (const circuit in this.circuitList) {
			if (circuit.getCircuitId() === circuitId) {
				return result;
			}
		}
		return result;
	}
}