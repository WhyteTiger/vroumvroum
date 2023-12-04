export class Point{
    x;
    y;

    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    getX(){
        return this.x;
    }
    setY(value) {
        this.y = value;
    }
    setX(value) {
        this.x = value;
    }
    getY(){
        return this.y;
    }
}