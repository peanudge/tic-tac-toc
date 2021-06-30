import { GameView } from './views/GameView.js';
import { Controller} from "./Controller.js";
import { GameStatus } from './GameStatus.js';
import { InformationView } from './views/InformationView.js';
import { UtilView } from './views/UtilView.js';

function main() {
    const views = {
        gameView: new GameView(),
        infoView: new InformationView(),
        utilView: new UtilView()
    }
    const gameStatus = new GameStatus(3);
    new Controller(gameStatus, views);
}

window.onload = function() {
    main();
}