export class ControllerDirection {
	
	speed;
	rotation;
	directionX;
	directionY;
	
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
				console.log("whant to move up");
				this.moveUp();
				break;
			case 'ArrowDown':
				console.log("whant to move down");
				this.moveDown();
				break;
			case 'ArrowLeft':
				console.log("whant to rotate left");
				this.rotateLeft();
				break;
			case 'ArrowRight':
				console.log("whant to rotate right");
				this.rotateRight();
				break;
		}
	}
	
	moveUp() {
		console.log("move up");
		console.log("this.directionY : "+this.directionY);
		console.log("this.speed : "+this.speed);
		console.log("this.newDirectionY : "+this.directionY);
		this.directionY -= this.speed;
	}
	
	moveDown() {
		console.log("move down");
		this.directionY += this.speed;
	}
	
	rotateLeft() {
		console.log("rotate left");
		this.directionX -= this.speed;
	}
	
	rotateRight() {
		console.log("rotate right");
		this.directionX += this.speed;
	}
}