import { GameView } from './views/GameView.js';
import { Controller} from "./Controller.js";
import { GameStatus } from './GameStatus.js';

function main() {
    const views = {
        gameView: new GameView()
    }
    const gameStatus = new GameStatus();
    new Controller(gameStatus, views);
}

window.onload = function() {
    main();
}