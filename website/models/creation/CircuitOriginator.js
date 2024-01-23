import { CircuitMemento } from "../entities/CircuitMemento.js";

export class CircuitOriginator {
	matrix
	
	constructor(matrix) {
		this.matrix = matrix;
	}
	
	createMatrix() {
		return new CircuitMemento(this.matrix);
	}
	
	save() {
		return this.matrix;
	}
	
	restore(state) {
		this.matrix = state.getMatrix();
	}
}
