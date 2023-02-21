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
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if (number === `.` && !this.currentOperand){this.currentOperand = this.currentOperand.toString() + `0`}
        else if (number === `.` && this.currentOperand.includes(`.`)) return;
        if(this.currentOperand.at(-4) === `.`) return;
        if(this.currentOperand.replace(`.` , ``).length >= 9) return;
        
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
    
    truncate (number) {
    return Math.trunc(number * Math.pow(10, 3)) / Math.pow(10, 3);
    }

    compute(){
        let computation;
        const prev = Number.parseFloat(this.previousOperand);
        const current = Number.parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
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
        this.currentOperand = this.truncate(computation);
        this.operation = undefined;
        this.previousOperand  = ``;
    }

    updateDisplay(){
        this.currentOperandField.innerText = this.currentOperand;
        if (this.operation) {
            this.previousOperandField.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandField.innerText = ``;
        }
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

deleteButton.addEventListener(`click`, button =>{
    calculator.delete();
    calculator.updateDisplay();
});

allClearButton.addEventListener(`click`, button =>{
    calculator.clear();
    calculator.updateDisplay();
});


// KEYBOARD SUPPORT
document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.selectOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute()
    calculator.updateDisplay()
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete()
    calculator.updateDisplay()
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear()
    calculator.updateDisplay()
  }

});