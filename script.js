let prevNum = '';
let currNum = '';
let operator;
let buffer = '0';

function updateDisplay(){
    const screen = document.querySelector('.screen');
    screen.innerText = buffer.slice(0,8);
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
        case 'x':
            result = prevNum * currNum;
            break;
        case '÷':
            if (currNum === 0) {
                return "Error";
            }
            result = prevNum / currNum;
            break;
        default:
            return;
    }
    return roundedResult(result).toString();
}

function roundedResult(result){
    return Math.round(result * 1000000)/1000000;
}

function handleButtonClick(value){
    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } else {
        switch (value) {
            case '%':
                applyPercentage();
                break;
            case 'DEL':
                deleteCount();
                break;
            case 'AC':
                clearCount();
                break;
            default:
                handleOperator(value);
        }
    }
}

function applyPercentage(){
    parseFloat(buffer);
    buffer /= 100;
    buffer = buffer.toString();
    updateDisplay();
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
            buffer = operate(prevNum, currNum, operator);
            prevNum = buffer;
            buffer = '';
        }
        operator = value;
    } else {
        if (prevNum && operator) {
            currNum = buffer;
            buffer = operate(prevNum, currNum, operator);
            prevNum = '';
            currNum = '';
            operator = null;
        }
        updateDisplay();
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