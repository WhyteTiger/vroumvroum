export class ButtonKart{
	
	valeur;
	
	constructor(valeur) {
		this.valeur = valeur;
	}
	
	getVal(){
		return this.valeur;
	}
	
	changeVal(newVal){
		this.valeur = newVal;
	}
}
