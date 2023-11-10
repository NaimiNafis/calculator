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