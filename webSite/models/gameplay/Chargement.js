export class Chargement {
	
	tileset   = null;
	kartTileX = null;
	kartTileY = null;
	rotate    = null;
	
	constructor(tileset, ligne, colone, rotation){
		this.tileset   = tileset;
		this.kartTileX = ligne;
		this.kartTileY = colone;
		this.rotate    = rotation;
	}
	
	getLigne() {
		return this.kartTileX[0];
	}
	
	getColone() {
		return this.kartTileY[0];
	}
	getRotate() {
		return this.rotate;
	}
}

