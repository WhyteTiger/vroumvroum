export class ControllerDirection {
	
	speed      = 0;
	rotation   = 0;
	directionX = 0;
	directionY = 0;
	
	constructor(map){
		this.speed      = 5;
		this.rotation   = 0;
		this.directionX = map.getXDepart() * 160;
		this.directionY = (map.getYDepart() + 1) * 60 + 100 * map.getYDepart();
		const self = this;
		
		window.addEventListener('keydown', function (event) {
			self.handleKeyDown(event);
		});
	}
	
	handleKeyDown(event) {
		switch (event.key) {
			case 'ArrowUp':
				this.moveUp();
				break;
			case 'ArrowDown':
				this.moveDown();
				break;
			case 'ArrowLeft':
				this.rotateLeft();
				break;
			case 'ArrowRight':
				this.rotateRight();
				break;
		}
	}
	
	moveUp() {
		this.directionY -= this.speed;
	}
	
	moveDown() {
		this.directionY += this.speed;
	}
	
	rotateLeft() {
		this.directionX -= this.speed;
	}
	
	rotateRight() {
		this.directionX += this.speed
	}
	
	
}