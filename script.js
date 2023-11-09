//State Management to make state/value tracking easier
const calcState = {
    prevNum : '',
    currNum : '',
    operator : null,
    buffer : '0',
}

function updateDisplay(){
    let screen = document.querySelector('.screen');
    screen.innerText = calcState.buffer;
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
    return roundResult(result).toString();
}

function roundResult(result){
    return Math.round(result * 100000) / 100000;
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
    calcState.buffer = calcState.buffer.substring(0, calcState.buffer.length - 1);
    if(calcState.buffer.length <= 0){
        calcState.buffer = '0';
    }
    updateDisplay();
}

function clearCount(){
    calcState.prevNum = '';
    calcState.currNum = '';
    calcState.operator = null;
    calcState.buffer = '0';
    updateDisplay();
}

function handleNumber(value){
    calcState.buffer = calcState.buffer === '0' ? value : calcState.buffer + value;//if it is not 0, then append the value in screen, easier to delete
    updateDisplay();
}

function handleOperator(value) {
    switch (value) {
        case '=':
            if (calcState.prevNum !== '' && calcState.operator !== null) {
                calcState.currNum = calcState.buffer;
                calcState.buffer = operate(calcState.prevNum, calcState.currNum, calcState.operator);
                calcState.prevNum = '';
                calcState.operator = null;
                updateDisplay();
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if (calcState.prevNum !== '' && calcState.operator !== null) {
                calcState.currNum = calcState.buffer;
                calcState.buffer = operate(calcState.prevNum, calcState.currNum, calcState.operator);
                calcState.prevNum = calcState.buffer;
            } else {
                calcState.prevNum = calcState.buffer;
            }
            calcState.buffer = '';
            calcState.operator = value;
            break;
        default:
            break;
    }
}

function initCalc(){
    const buttonsContainer = document.querySelector('.calc-buttons');
    buttonsContainer.addEventListener('click', (e) => {
        if (e.target.matches('button')){
            handleButtonClick(e.target.innerText);
        }
    });
}

initCalc();





/*
This code tooks so many memories if there are lots buttons used.
instead of attaching eventlisteners to each button, use event delegation and bubble up to use. 
Use parent or container. the event listener will for 'click events' that bubble up from its children.

function clickButton(){
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            handleButtonClick(e.target.innerText);
        })
    });
}

clickButton();

*/

/*

Pseudocode:

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