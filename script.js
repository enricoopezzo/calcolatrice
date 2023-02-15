class Calculator{
    constructor(previousOperandField, currentOperandField){
        this.previousOperandField = previousOperandField;
        this.currentOperandField  = currentOperandField;
        this.clear();
    }
    clear(){
        this.currentOperand = ``;
        this.previousOperand  = ``;
        this.operation = undefined;
    }

    delete(){

    }

    appendNumber(number){
        if (number === `,` && !this.currentOperand){this.currentOperand = this.currentOperand.toString() + `0`}
        else if (number === `,` && this.currentOperand.includes(`,`)) return;
        
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    selectOperation(operation){
        if(this.previousOperand){
            this.compute()
        }else if (!this.currentOperand) return;
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand  = ``;
    }

    compute(){
        let computation;
        const prev = Number.parseFloat(this.previousOperand);
        const current = Number.parseFloat(this.currentOperand);
        if(!prev || !current) return;
        switch(this.operation){
            case `÷`:
                computation = prev / current;
                break;
            case `×`:
                computation = prev * current;
                break;
            case `-`:
                computation = prev - current;
                break;
            case `+`:
                computation = prev + current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand  = ``;
    }

    updateDisplay(){
        this.currentOperandField.innerText = this.currentOperand;
        this.previousOperandField.innerText = this.previousOperand;
    }
}
const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalButton = document.querySelector(`[data-equals]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const deleteButton = document.querySelector(`[data-delete]`);
const previousOperandField = document.querySelector(`[data-previous-operand]`);
const currentOperandField = document.querySelector(`[data-current-operand]`);


const calculator = new Calculator(previousOperandField, currentOperandField);

numberButtons.forEach(numberButton =>{
    numberButton.addEventListener(`click`, ()=>{
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(operationButton =>{
    operationButton.addEventListener(`click`, ()=>{
        calculator.selectOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener(`click`, button =>{
    calculator.compute();
    calculator.updateDisplay();
})