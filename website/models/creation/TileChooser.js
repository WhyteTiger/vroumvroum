import {Map} from "../entities/Map.js";
import {Tileset} from "../entities/Tileset.js";

export class TileChooser {
	_map
	_circuit
	_matrix
	
	constructor() {
		this._map = new Map(new Tileset("circuit.png"), [[]], [[]]); //PB de chargement au début : pas test de bouger cette ligne
		this.init();
	}
	
	init(){
		console.log("TileChooser début init");
		const localStorageMatrix = localStorage.getItem('matrix');
		console.log("localStorageMatrix : "+ localStorageMatrix);
		if(localStorageMatrix === null || localStorageMatrix === undefined || localStorageMatrix === "") {
			this.newMatrix();
		} else {
			this._matrix = JSON.parse(localStorageMatrix);
		}
		
		const div = document.querySelector('#choosers');
		this._circuit = document.querySelector('#circuit');
		
		// empty circuit
		this._map.dessinerTuiles(this._matrix[0], this._matrix[1], this._circuit, 80);
		this._map.replaceTiles(  this._matrix[0], this._matrix[1], this._circuit, 80, this._matrix[1]);
		
		// 1st container with common tiles. Visible by default.
		const cont1 = document.createElement('section');
		cont1.classList.add('tile-selector');
		this._map.dessinerTuiles([1, 2, 3, 4, 5, 6, 8, 9, 10, 11], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], cont1);
		div.appendChild(cont1);
		
		// 2nd container with starts and ends. Invisible by default.
		const cont2 = document.createElement('section');
		cont2.classList.add('tile-selector');
		cont2.classList.add('invisible');
		this._map.dessinerTuiles([7, 12], [0, 0], cont2);
		div.appendChild(cont2);
		
		// 3rd container with checkpoints. Invisible by default.
		const cont3 = document.createElement('section');
		cont3.classList.add('tile-selector');
		cont3.classList.add('invisible');
		this._map.dessinerTuiles([13, 14, 15, 16, 17, 18], [0, 0, 0, 0, 0, 0], cont3);
		div.appendChild(cont3);
		console.log("TileChooser fin init");
	}
	
	get circuit() {
		return this._circuit;
	}
	
	get map() {
		return this._map;
	}
	
	get matrix() {
		return this._matrix;
	}
	
	setCircuit(value) {
		this._circuit = value;
	}
	
	setMatrix(value) {
		this._matrix = value;
	}
	
	newMatrix() {
		let newMatrix = [[], []];
		for(let i = 0; i < 96; i++) {
			newMatrix[0].push(1);
			newMatrix[1].push(0);
		}
		this._matrix = newMatrix;
		console.log(this._matrix);
	}
	
	reset() {
		this.newMatrix();
		this.map.replaceTiles(this._matrix[0], this._matrix[1], this.circuit, 80, this._matrix[1]);
	}
}
