const TURN_O = "O";
const TURN_X = "X";

const O_MARK = "O";
const X_MARK = "X";
const EMPTY_MARK = "";

const RESULT_WIN_O = "O";
const RESULT_WIN_X = "X";
const RESULT_DRAW = "DRAW";
const RESULT_YET = "";

const GAME_RUNNING = "running";
const GAME_STOP = "stop";


const tag = "[GameStatus]"

export class GameStatus {
    constructor(size = 3) {
        this.statusFlag = GAME_RUNNING;
        this.size = size;
        this.initialize();
        this.score = {
            [RESULT_WIN_O]: 0,
            [RESULT_WIN_X]: 0
        };
    }

    reset() {
        this.initialize();   
    }

    initialize() {
        this.turn = TURN_O;
        this.result = RESULT_YET;
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
        if(this.result !== RESULT_YET) return false;
        
        if(this.data[row][col] !== EMPTY_MARK) {
            return false;
        } 

        if(this.turn === TURN_O) {
            this.data[row][col] = O_MARK;
            this.turn = TURN_X;
        } else { // X Turn.
            this.data[row][col] = X_MARK;
            this.turn = TURN_O;
        }

        return true;
    }
    
    applyResult(result) {
        this.result = result;
        if(result === RESULT_WIN_O) {
            this.score[RESULT_WIN_O] += 1;
        } else if (result === RESULT_WIN_X) {
            this.score[RESULT_WIN_X] += 1;
        } else if (result === RESULT_DRAW) {
            this.score[RESULT_WIN_O] += 1;
            this.score[RESULT_WIN_X] += 1;
        }
    }

    checkFinish() {
        if(this.result !== RESULT_YET) {
            return true;
        }

        for(let r = 0; r < this.size; r++){
            let first = this.data[r][0];
            if(first === EMPTY_MARK) continue;
            
            let isAnyLineSame = true;
            for(const el of this.data[r]) {
                if(first !== el) {
                    isAnyLineSame = false;
                    break;
                }
            }
            if(isAnyLineSame) {
                this.applyResult(first === O_MARK ? RESULT_WIN_O:RESULT_WIN_X);
                return true;
            }
        }

        for(let c = 0; c < this.size; c++) {
            let first = this.data[0][c];
            if(first === EMPTY_MARK) continue;

            let isAnyLineSame = true;
            for(let r = 0; r < this.size; r++) {
                if(first !== this.data[r][c]) {
                    isAnyLineSame = false;
                    break;
                }
            }
            if(isAnyLineSame) {
                this.applyResult(first === O_MARK ? RESULT_WIN_O:RESULT_WIN_X);
                return true;
            }
        }

        const slash = []
        const inverseSlash = []
        for(let i = 0; i < this.size; i++) {
            slash.push(this.data[i][i]);
            inverseSlash.push(this.data[i][this.size - 1 - i]);
        }

       let first = slash[0];
        if(first !== EMPTY_MARK){
            let isAnyLineSame = true;
            for(let i = 0; i < this.size; i++) {
                if(first !== slash[i]) {
                    isAnyLineSame = false;
                    break;
                }
            }
            if(isAnyLineSame) {
                this.applyResult(first === O_MARK ? RESULT_WIN_O:RESULT_WIN_X);
                return true;
            }
        }
        
        first = inverseSlash[0];
        if(first !== EMPTY_MARK){
            let isAnyLineSame = true;
            for(let i = 0; i < this.size; i++) {
                if(first !== inverseSlash[i]) {
                    isAnyLineSame = false;
                    break;
                }
            }
            if(isAnyLineSame) {
                this.applyResult(first === O_MARK ? RESULT_WIN_O:RESULT_WIN_X);
                return true;
            }
        }

        // check draw
        let isDraw = true;
        for(let r = 0; r < this.size; r++) {
            for(let c = 0; c < this.size; c++) {
                if(this.data[r][c] === EMPTY_MARK){
                    isDraw = false;
                    break;
                }
            }
            if(!isDraw){
                break;
            }
        }

        if(isDraw) {
            this.applyResult(RESULT_DRAW);
            return true;
        }
        
        return false;
    }
}