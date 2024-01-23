export class CircuitCareTaker {
	history
	
	constructor() {
		this.history = [];
	}
	
	push(circuit) {
		this.history.push(circuit.createMatrix());
	}
	
	pop() {
		if (this.history.length === 0) return null;
		return this.history.pop();
	}
}
