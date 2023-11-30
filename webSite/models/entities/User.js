export class User {
    static currentUserId = 0;
    userId;
    kartUsed;
    kartList;
    isBanned;
    
    
    constructor(userId, kartUsed, kartList) {
        this.userId   = userId;
        this.kartUsed = kartUsed;
        this.kartList = kartList;
        this.isBanned = false;
    }
    
    static nextUserId() {
        return ++this.currentUserId;
    }
}
