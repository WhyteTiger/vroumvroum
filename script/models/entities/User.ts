import {Kart} from "./Kart";
import {List} from "../List";

export class User {
    static currentUserId : number = 0;
    userId               : number;
    kartUsed             : Kart;
    kartList             : List<Kart>;
    isBanned             : boolean;


    constructor(kartUsed: Kart, kartList: List<Kart>) {
        this.kartUsed = kartUsed;
        this.kartList = kartList;
        this.isBanned = false;

        User.currentUserId += 1;
        this.userId = User.currentUserId;
    }
}