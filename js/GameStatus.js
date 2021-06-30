const O_USER = "o_user";
const X_USER = "x_user";

const O_MARK = "O";
const X_MARK = "X";
const EMPTY_MARK = "";

export class GameStatus {
    constructor(size = 3) {
        this.size = size;
        this.turn = O_USER;
        this.initialize();    
    }

    initialize() {
        this.data = [];
        for(let r = 0; r < this.size; r++) {
            const temp = [];
            for (let c = 0; c < this.size; c++) {
                temp.push(EMPTY_MARK);
            }
            this.data.push(temp);
        }
    }

    put(row, col) {
        if(this.data[row][col] !== EMPTY_MARK) {
            // NOTHING.
            return;
        } 

        if(this.turn === O_USER) {
            this.data[row][col] = O_MARK;
            this.turn = X_USER;
        } else {
            this.data[row][col] = X_MARK;
            this.turn = O_USER;
        }
    }
}