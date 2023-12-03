export class Point{
    x;
    y;

    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    get getX(){
        return this.x;
    }
    set setY(value) {
        this.y = value;
    }
    set setX(value) {
        this.x = value;
    }
    get getY(){
        return this.y;
    }
}