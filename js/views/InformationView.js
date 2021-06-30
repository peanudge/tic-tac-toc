const tag = "[InformationView]"
export class InformationView {
    constructor(template= new Template()) {
        this.element = document.querySelector("#info-panel");
        this.template = template;
    }

    show(score, winner = "") {
        this.element.innerHTML = 
            this.template.getScores(score) +
            this.template.getWinner(winner); 
    }
}

class Template {
    getScores(score) {
        return `<div class="score-panel">
            <h1 class="score">
                ${score['O']} 
                <span>:</span>
                ${score['X']}
            </h1>
        </div>`;
    }

    getWinner(name){
        if(name === "X" || name === "O"){
            return `<h2>"${name}"가 승리했습니다.</h2>`
        } else if(name === "DRAW") {
            return `<h2>비겼습니다.</h2>`
        } else {
            return ``;
        }
    }
}