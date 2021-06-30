export class GameView  {
    constructor(template = new Template()) {
        this.element = document.querySelector("#game");
        this.template = template;
        this.eventsBinding();
    }

    eventsBinding() {
        this.delegateEvent("click", ".box", (event) => this.handleClick(event));
    }

    delegateEvent(eventName, selector, handler) {
        const emitEvent = (event) => {
            const potentialElements = this.element.querySelectorAll(selector);
            for (const potentialElement of potentialElements) {
              if (potentialElement === event.target) {
                return handler.call(event.target, event);
              }
            }
          };
        this.on(eventName, emitEvent);
    }

    emit(eventName, value) {
        const event = new CustomEvent(eventName, {detail: value});
        this.element.dispatchEvent(event);
    }

    on(eventName, eventHandler) {
        this.element.addEventListener(eventName, eventHandler);
    }

    show(data = []) {
        this.element.innerHTML = this.template.getBoard(data);
    }

    handleClick(event) {
        const {row, col} = event.target.dataset;
        this.emit("@put", {
            row, 
            col
        })
    }
}

class Template {
    getBoard(data=[]){
        return `
        <div class="board">
            ${data.map((row, rowIdx)=> {
                return `<div class="row">
                    ${
                        row.map((element, colIdx) => 
                            `<div class="box" 
                                data-row=${rowIdx} 
                                data-col=${colIdx}>
                                ${element}
                            </div>`).join("")
                    }
                </div>`;
            }).join("")}
        </div>
        `;
    }       
}