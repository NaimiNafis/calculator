let previousNumber = '';
let currentNumber = '';
let operator = '';

const screen = document.querySelector('.screen');

function buttonClick(value){
    if (isNaN(value) && value !== '.' && value !== 'CLEAR' && value !== 'DELETE'){
        operatorClick(value);
    } else if (value !== '.' && value !== 'CLEAR' && value !== 'DELETE'){
        numberClick(value);
    } else if (value === 'CLEAR'){
        clearClick();
    } else if (value === 'DELETE'){
        deleteClick();
    }
    updateDisplay(value);
};

function operatorClick(value){
    if (currentNumber !== '') { 
        if (previousNumber !== '') {
            calculate();
        }
        previousNumber = currentNumber;
        currentNumber = '';
    }
    operator = value;
}

function numberClick(value){
    if (currentNumber === '' && value === '0'){
        return;
    }
    currentNumber += value;
}

function updateDisplay(){
    screen.innerText = currentNumber === '' ? previousNumber : currentNumber;
}

function clearClick(){
    previousNumber = '';
    currentNumber = '';
    operator = '';
}

function deleteClick(){
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
}

function calculate(){
    let prev = parseInt(previousNumber, 10);
    let current = parseInt(currentNumber, 10);
    switch(operator){
        case '+':
            previousNumber = prev + current;
            break;
        case '-':
            previousNumber = prev - current;
            break;
        case 'x':
            previousNumber = prev * current;
            break;
        case '/':
            if (current === 0) {
                screen.innerText = 'Error';
                return;
            }
            previousNumber = prev / current;
            break;          
    }
    currentNumber = '';
    operator = '';
    updateDisplay();
}

//expect buttonClick(event.target.innerText)
function setupButtonListeners(){
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            buttonClick(event.target.innerText);
        });
    });
}

setupButtonListeners();

/*

 */