//State Management to make state/value tracking easier
const calcState = {
    prevNum : '',
    currNum : '',
    operator : null,
    buffer : '0',
    isReadyForEqual : false,
}

function updateDisplay(){
    let screen = document.querySelector('.screen');
    screen.innerText = calcState.buffer;
}

function operate(prevNum, currNum, operator) {
    // Perform calculation and return result.
    prevNum = parseFloat(prevNum);
    currNum = parseFloat(currNum);

    switch (operator) {
        case '+': return prevNum + currNum;
        case '-': return prevNum - currNum;
        case '*': return prevNum * currNum;
        case '/': return currNum === 0 ? "SYNTAX ERROR" : prevNum / currNum;
        default: return null;
    }
}

function roundResult(result){
    //turn to 5 decimal point only, prevent overflow
    return Math.round(result * 100000) / 100000;
}

function finishOperation(result){
    // update the state with the result, and reset ready state.
    calcState.prevNum = '';
    calcState.currNum = '';
    calcState.operator = null;
    calcState.buffer = result.toString();
    calcState.isReadyForEqual = false;
    updateDisplay();
}

function handleEqualOperation(result){
    //Handle '='
    if (calcState.isReadyForEqual){
        const result = operate(calcState.prevNum, calcState.buffer, calcState.operator);
        const roundedResult = roundResult(result);
        finishOperation(roundedResult);
    }
}

function handleButtonClick(value){
    //if number or period true
    if (!isNaN(value) || value === '.') {
        //if ready for equal sign, ignore all number and '.'
        if (!calcState.isReadyForEqual) {
            handleNumber(value);
        }
    } else if (value === 'CLEAR') {
        clearCount();
    } else if (value === 'DELETE') {
        deleteCount();
    } else {
        // any other input is ignored if the state is ready for equal and the input is not '='
        if (calcState.isReadyForEqual && value !== '='){
            return;
        }
        handleOperator(value);
    }
}

function handleNumber(value){
    calcState.buffer = calcState.buffer === '0' ? value : calcState.buffer + value;//if it is not 0, then append the value in screen, easier to delete
    updateDisplay();
}

function handleOperator(value) {
    if (value === '=') {
        handleEqualOperation();
    } else {
        if (calcState.prevNum !== '' && calcState.operator !== null && calcState.buffer !== '') {
            calcState.currNum = calcState.buffer;
            const result = operate(calcState.prevNum, calcState.currNum, calcState.operator);
            calcState.buffer = roundResult(result).toString();
            updateDisplay();
        }
        calcState.prevNum = calcState.buffer;
        calcState.buffer = '';
        calcState.operator = value;
        calcState.isReadyForEqual = true; // Ready for next number
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
    calcState.isReadyForEqual = false;
    updateDisplay();
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