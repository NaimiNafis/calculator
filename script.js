let prevNum = '';
let currNum = '';
let operator;
let buffer = '0';

function updateDisplay(){
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
                return "SYNTAX ERROR";
            }
            result = prevNum / currNum;
            break;
        default:
            return;
    }
    return roundedResult(result);
}

function roundedResult(result){
    return Math.round(result * 1000000)/1000000;
}

function handleButtonClick(value){
    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } else {
        switch (value) {
            case 'DELETE':
                deleteCount();
                break;
            case 'CLEAR':
                clearCount();
                break;
            default:
                handleOperator(value);
        }
    }
}

function deleteCount(){
    buffer = buffer.substring(0, buffer.length - 1);
    if(buffer.length <= 0){
        buffer = '0';
    }
    updateDisplay();
}

function clearCount(){
    prevNum = '';
    currNum = '';
    operator = null;
    buffer = '0';
    updateDisplay();
}

function handleNumber(value){
    if (value === '.' && buffer.includes('.')) {
        return;
    } else if (operator && buffer === '') {
        buffer = value;
    } else {
        buffer = buffer === '0' ? value : buffer + value;
    }
    updateDisplay();
}

function handleOperator(value) {
    if (value !== '=') {
        if (!prevNum) {
            prevNum = buffer;
            buffer = '';
        } else if (operator) {
            currNum = buffer;
            buffer = operate(prevNum, currNum, operator).toString();
            prevNum = buffer;
            buffer = '';
        }
        operator = value;
    } else {
        if (prevNum && operator) {
            currNum = buffer;
            buffer = operate(prevNum, currNum, operator).toString();
            prevNum = '';
            currNum = '';
            operator = null;
        }
        updateDisplay();
    }
}

function clickButton(){
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            handleButtonClick(e.target.innerText);
        })
    });
}

clickButton();


/*

// Pseudocode for Calculator Functionality

// When a button is clicked or clickButton()
IF a button is clicked
    CALL handleButtonClick with e.target.innerText

// Defining handleButtonClick function
FUNCTION handleButtonClick(value)
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