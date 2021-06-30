const tag = "[InformationView]"
export class InformationView {
    constructor(template= new Template()) {
        this.element = document.querySelector("#info-panel");
        this.template = template;
    }

    show(scores, winner = "") {
        this.element.innerHTML = 
            this.template.getScores(scores) +
            this.template.getWinner(winner); 
    }
}

class Template {
    getScores(scores) {
        return `<h2>
            ${scores[0]}
            <span>:</span>
            ${scores[1]}
        </h2>`;
    }

    getWinner(name){
        if(name === "X" || name === "O"){
            return `<h2>${name}가 승리했습니다.</h2>`
        } else if(name === "DRAW") {
            return `<h2>비겼습니다.</h2>`
        } else {
            return ``;
        }
    }
}