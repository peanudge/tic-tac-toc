const tag = "[Controller]";

export class Controller {
    constructor({gameView}){
        console.log(tag, "constructor");
        this.gameView = gameView;
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
    }

    render() {
        this.gameView.show([
               Array.of("o","o","x"),
               Array.of("o","x","o"),
               Array.of("x","o","o")
           ]);
    }
}