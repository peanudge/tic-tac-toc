const tag = "[Controller]";

export class Controller {
    constructor(gameStatus, {gameView, infoView, utilView}){
        console.log(tag, "constructor");
        this.gameStatus = gameStatus;
        this.gameView = gameView;
        this.infoView = infoView;
        this.utilView = utilView;

        this.subscribeViewEvents();
        this.render();
    }

    subscribeViewEvents() {
        this.gameView.on("@put", (event) => {
            const { row, col } = event.detail;
            this.put(row, col);
        });

        this.utilView.on("@reset", (event) => {
            this.gameStatus.reset();
            this.render();
        });
        
        this.utilView.on("@start", (event) => {
            this.gameStatus.initialize();
            this.render();
        });
    }

    put(row, col) {
        const success = this.gameStatus.put(row, col);
        if(success) {
            this.gameStatus.checkFinish();
            this.render();
        }
    }

    render() {
        const {
            data, score, result
        } = this.gameStatus;

        this.gameView.show(data);
        this.infoView.show(score, result);
    }
}