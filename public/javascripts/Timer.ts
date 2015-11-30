/// <reference path="../../typings/jquery/jquery.d.ts" />

class Timer {
    time: number;
    running: boolean;
    element: JQuery;
    
    /**
     * Takes the element to update every second
     */
    constructor(element: JQuery) {
        this.element = element;
        this.running = false;
    }
    
    start(): void {
        this.time = 0;
        this.element.text(0);
        this.running = true;
        setTimeout(() => this.update(), 1000);
    }
    
    /**
     * Returns the time passed in seconds
     */
    stop(): number {
        this.running = false;
        return this.time;
    }
    
    private update(): void {
        if (this.running) {
            this.time++;
            this.element.text(this.time);
            setTimeout(() => this.update(), 1000);
        }
    }
}