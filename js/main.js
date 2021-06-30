import { GameView } from './views/GameView.js';
import { Controller} from "./Controller.js";

function main() {
    const views = {
        gameView: new GameView()
    }

    new Controller(views);
}

window.onload = function() {
    main();
}