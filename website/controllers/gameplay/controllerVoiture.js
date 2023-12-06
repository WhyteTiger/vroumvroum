import {API} from "../../models/API.js";
export class ControllerVoiture{
	constructor(valButton,vroumCoin) {
		this.valButton = valButton;
		this.vroumCoin = vroumCoin;
	}
	
	buttonPress(){
		if (this.valButton === -1){
			this.valButton = 1;
		}
		if (this.valButton > 1){
			if(this.vroumCoin >= this.valButton){
				this.vroumCoin -= this.valButton;
				this.valButton = 1;
			}
			else{
				alert("Vous n'avez pas suffisament de vroumCoin !");
				return 0;
			}
		}
		if (this.valButton === 1){
			this.valButton = -1;
		}
		return 1;
	}
	
	getUpdatedVroumCoin(){
		return this.vroumCoin;
	}
	
}
