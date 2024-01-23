export class CircuitMemento {
	matrix
	
	constructor(matrix) {
		this._matrix = matrix;
	}
	
	get matrix() {
		return this._matrix;
	}
}