const add = function(num1, num2){
    return num1 + num2;
  };
  
  const subtract = function(num1, num2){
    return num1 - num2;
  };
  
  const multiply = function(num1, num2){
    return num1 * num2;
  };
  
  const divide = function(num1, num2){
    return num1 / num2;
  };
  
  let num1, num2, operator;
  
  const operate = function(num1, num2, operator){
    switch(operator){
      case add:
        return add(num1, num2);
      case subtract:
        return subtract(num1, num2);
      case multiply:
        return multiply(num1, num2);
      case divide:
        return divide(num1, num2);
      default:
        throw new Error("Invalid operator");
    }
  };
  
  console.log(operate(20, 5, multiply));