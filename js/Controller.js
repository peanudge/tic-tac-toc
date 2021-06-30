const tag = "[Controller]";

export class Controller {
    constructor(gameStatus, {gameView}){
        console.log(tag, "constructor");
        this.gameView = gameView;
        this.gameStatus = gameStatus;
        this.subscribeViewEvents();
        this.render();
    }

    subscribeViewEvents() {
        this.gameView.on("@put", (event) => {
            const { row, col } = event.detail;
            this.put(row, col);
        });
    }

    put(row, col) {
        console.log(tag, "Put Event", row, col)
        this.gameStatus.put(row, col);
        this.render();
    }

    render() {
        this.gameView.show(this.gameStatus.data);
    }
}