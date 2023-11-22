import {User} from "./User";

export class Creator extends User{
    pseudo;
    passWord;
    vroumCoins;
    follows;
    isAdministrator;
    
    
    constructor(kartUsed, kartList, pseudo, passWord, follows, isAdministrator) {
        super(kartUsed, kartList);
        this.pseudo     = pseudo;
        this.passWord   = passWord;
        
        if (follows == null) {
            this.follows = [];
        } else {
            this.follows = follows;
        }
        
        this.vroumCoins      = 0;
        this.isAdministrator = isAdministrator;
    }
}