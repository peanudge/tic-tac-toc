const O_USER = "o_user";
const X_USER = "x_user";

const O_MARK = "O";
const X_MARK = "X";
const EMPTY_MARK = "";

const WIN_O = "O";
const WIN_X = "X";
const DRAW = "DRAW";
const NOT_YET = "";

const SCORE_IDX_O = 0;
const SCORE_IDX_X = 1;

const tag = "[GameStatus]"

export class GameStatus {
    constructor(size = 3) {
        this.size = size;
        this.initialize();
        this.scores = [0,0];    
    }

    reset() {
        this.initialize();   
    }

    initialize() {
        this.turn = O_USER;
        this.winner = NOT_YET;
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
    
    checkFinish() {
        console.log(tag, "checkFinsh");
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
                this.winner = first === O_MARK ? O_USER: X_USER;
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
                this.winner = first === O_MARK ? O_USER: X_USER;
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
                this.winner = first === O_MARK ? O_USER: X_USER;
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
                this.winner = first === O_MARK ? O_USER: X_USER;
                return true;
            }
        }
        
        return false;
    }
}