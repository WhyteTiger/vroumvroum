export class List<T> {
    private items;
    
    constructor() {
        this.items = [];
    }
    
    size(){
        return this.items.length;
    }
    
    add(value){
        this.items.push(value);
    }
    
    get(index){
        return this.items[index];
    }
}
