class Calculator{
    constructor(previousOperandField, currentOperandField){
        this.previousOperandField = previousOperandField;
        this.currentOperandField  = currentOperandField;
    }
    clear(){
        this.currentOperand = ``;
        this.previousOperand  = ``;
        this.operation = undefined;
    }

    delete(){

    }

    appendNumber(number){

    }

    selectOperation(operation){

    }

    compute(){

    }

    updateDisplay(){

    }
}
const numberButtons  = document.querySelectorAll(`[data-number]`);
const operationButtons  = document.querySelectorAll(`[data-operation]`);
const equalButton = document.querySelector(`[data-equals]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const deleteButton = document.querySelector(`[data-delete]`);
const previousOperandField = document.querySelector(`[data-previous-operand]`);
const currentOperandField = document.querySelector(`[data-current-operand]`);

console.log(deleteButton.innerHTML)

const calculator = new Calculator(previousOperandField, currentOperandField)