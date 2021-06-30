export class UtilView {
    constructor() {
        this.element = document.querySelector("#util-panel");
        this.resetButton = this.element.querySelector("#reset-btn");
        this.restartButton = this.element.querySelector("#start-btn");
        this.eventsBinding();
    }

    eventsBinding() {
        this.restartButton.addEventListener("click", () => this.handleStart());      
        this.resetButton.addEventListener("click", () => this.handleReset());      
    }

    on(eventName, eventHandler) {
        this.element.addEventListener(eventName, eventHandler);
    }

    emit(eventName, value) {
        const event = new CustomEvent(eventName, {detail: value});
        this.element.dispatchEvent(event);
    }

    handleReset() {
        this.emit("@reset");
    }

    handleStart() {
        this.emit("@start");
    }

}