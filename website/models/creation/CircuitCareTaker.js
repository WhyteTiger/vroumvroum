import {CircuitOriginator} from "./CircuitOriginator";

export class CircuitCareTaker {
	
	constructor() {
		this._circuitHistory = [];
	}
	
	push(circuit) {
		this.history.push(circuit.createMatrix());
	}
	
	pop() {
		if (this.state.length === 0) return null;
		return this.history.pop();
	}
}