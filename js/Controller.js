const tag = "[Controller]";

export class Controller {
    constructor(gameStatus, {gameView, infoView}){
        console.log(tag, "constructor");
        this.gameStatus = gameStatus;
        this.gameView = gameView;
        this.infoView = infoView;
        
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
        const success = this.gameStatus.put(row, col);
        if(success) {
            const finish = this.gameStatus.checkFinish();
            
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