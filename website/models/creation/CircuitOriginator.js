import {CircuitMemento} from "../entities/CircuitMemento";

export class CircuitOriginator {
	
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