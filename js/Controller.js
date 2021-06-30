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
        this.gameStatus.put(row, col);
        const finish = this.gameStatus.checkFinish();
        if(finish) {
            // TODO: 다시하기 팝업 보여주기.
            console.log("끝!");
        }
        this.render();
    }

    render() {
        const {
            data, scores, winner
        } = this.gameStatus;

        this.gameView.show(data);
        this.infoView.show(scores, winner);
    }
}