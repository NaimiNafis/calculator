const add = function(prevNum, currNum){
    return prevNum + currNum;
  };
  
const subtract = function(prevNum, currNum){
    return prevNum - currNum;
};

const multiply = function(prevNum, currNum){
    return prevNum * currNum;
};

const divide = function(prevNum, currNum){
    if (currNum === 0) {
        throw new Error("Division by zero");
      }
      return prevNum / currNum;
};

let prevNum = '';
let currNum = '';
let operator;
let buffer = '0';

function updateDisplay(value){
    // buffer = value; this means you just replace it entirely, we want to append it so,
    buffer = buffer === "0" ? value : buffer + value;
    const screen = document.querySelector('.screen');
    screen.innerText = buffer;
}

function operate(operator, num1, num2){
    switch(operator){
      case 'add':
        return add(num1, num2);
      case 'subtract':
        return subtract(num1, num2);
      case 'multiply':
        return multiply(num1, num2);
      case 'divide':
        return divide(num1, num2);
      default:
        throw new Error("Invalid operator");
    }
  }

function buttonClick(){
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            updateDisplay(e.target.innerText);
        })
    });
}

buttonClick();

/*

IF button click,
    update e.target.innerText to initButtonListeners

IN initButtonListeners,
    IF e.target.innerText = value
        is NaN THEN
            pass it to isOperator(value)
        is Number THEN
            pass it to isNumber(value)
        THEN operate;

IN isNumber(value),
    store value to currNum,
    IF prevNum is still '',
        prevNum = currNum;
    ELSE
        return currNum;

IN operate,
    let result;
    FOR EACH cases,
        DO task and store in result
        updateDisplay(result);
*/