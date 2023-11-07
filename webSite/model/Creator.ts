import {User} from "./User";
import {List} from "./List";
import {Kart} from "./Kart";

export class Creator extends User{
    pseudo     : string;
    passWord   : string;
    vroumCoins : number;
    follows    : List<Creator>


    constructor(kartUsed: Kart, kartList: List<Kart>, pseudo: string, passWord: string, follows: List<Creator>) {
        super(kartUsed, kartList);
        this.pseudo     = pseudo;
        this.passWord   = passWord;

        if (follows == null) {
            this.follows = new List<Creator>();
        } else {
            this.follows = follows;
        }

        this.vroumCoins = 0;
    }
}