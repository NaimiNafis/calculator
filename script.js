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
    let result;
    switch(operator){
        case '+':
            result = add(num1, num2);
        case '-':
            result = subtract(num1, num2);
        case '*':
            result = multiply(num1, num2);
        case '/':
            result = divide(num1, num2);
        case '=':
            updateDisplay(result)

        default:
        throw new Error("Invalid operator");
    }
  }

function clickButton(){
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            handleButtonPress(e.target.innerText);
        })
    });
}

function handleButtonPress(value){
    if(isNaN(value)){
        handleOperator(value);
    } else {
        handleNumber(value);
    }
}

function handleNumber(value){
    buffer = buffer === "0" ? value : buffer + value;
    if (operator === undefined) {
        prevNum = buffer;
    }
    updateDisplay(buffer);
}

function handleOperator(value){
    switch(value){
        case '=':

    }
}



clickButton();

/*

// Pseudocode for Calculator Functionality

// When a button is clicked or clickButton()
IF a button is clicked
    CALL handleButtonPress with e.target.innerText

// Defining handleButtonPress function
FUNCTION handleButtonPress(value)
    IF value is not a number (isNaN(value))
        CALL handleOperator with value
    ELSE
        CALL handleNumber with value

// Defining handleNumber function to handle number input
FUNCTION handleNumber(value)
    APPEND value to buffer
    IF no previous operation pending (operator is undefined)
        SET prevNum to buffer value
    UPDATE display with buffer

// Defining handleOperator function to handle operator input
FUNCTION handleOperator(value)
    IF value is '='
        IF prevNum and operator are defined
            CALL operate with prevNum, buffer (as currNum), and operator
        ELSE
            DO nothing (no operation to complete)
    ELSE IF value is one of the operators '+', '-', '*', '/'
        IF prevNum is not empty and operator is defined
            CALL operate with prevNum, buffer (as currNum), and operator
            RESET buffer to empty string
            RESET prevNum to result of operation
        SET operator to value
    UPDATE display if needed

// Defining operate function to perform the calculation
FUNCTION operate(prevNum, currNum, operator)
    SWITCH operator
        CASE '+'
            COMPUTE prevNum + currNum
        CASE '-'
            COMPUTE prevNum - currNum
        CASE '*'
            COMPUTE prevNum * currNum
        CASE '/'
            COMPUTE prevNum / currNum
    STORE the result
    UPDATE display with result
    RESET buffer, prevNum, and operator as needed for next calculation

*/