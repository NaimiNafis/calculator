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

function operate(prevNum, currNum, operator){
    prevNum = parseFloat(prevNum);
    currNum = parseFloat(currNum);
    let result;
    switch(operator){
        case '+':
            result = prevNum + currNum;
            break;
        case '-':
            result = prevNum - currNum;
            break;
        case '*':
            result = prevNum * currNum;
            break;
        case '/':
            if (currNum === 0) {
                return;
            }
            result = prevNum / currNum;
            break;
        default:
            return;
    }
    return result;
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
            if(prevNum !== undefined && operator !== undefined) {
                operate(prevNum, buffer, operator);
            } else {
                return;
            }
        case '+':
        case '-':
        case '*':
        case '/':
            let result = operate(prevNum, buffer, operator);
            buffer = '';
            prevNum = result;
    } operator = value;
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