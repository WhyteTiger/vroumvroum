import {Kart} from "./Kart";
import {List} from "../List";

export class User {
    static currentUserId = 0;
    userId;
    kartUsed;
    kartList;
    isBanned;
    
    
    constructor(kartUsed, kartList) {
        this.kartUsed = kartUsed;
        this.kartList = kartList;
        this.isBanned = false;
        
        User.currentUserId += 1;
        this.userId = User.currentUserId;
    }
}
