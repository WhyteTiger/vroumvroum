export class Timer {
    constructor() {
        this.startTime = Date.now();
    }

    getElapsedTime() {
        return Date.now() - this.startTime;
    }
}
