/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-return-assign */
/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-assignment */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-undef */

const displayMathOperation = (...args) => {
  const mathOperationBuilder = args[0];
  return $('.math-expression').html(`Expressão: ${mathOperationBuilder}`);
};

const displayMathOperationResult = (...args) => {
  const finalMathOperationResult = args[0];
  return $('.calculate-math-operation').on('click', function (event) {
    event.preventDefault();
    $('.math-expression').html(`Expressão: ${finalMathOperationResult}`);
    $('.math-result').html(`Resultado: ${finalMathOperationResult}`);
  });
};

const checkIfInputIsANumber = () => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const addFirstInputToMathOperation = (parseMathOperation) => {
  let mathOperationBuilder = 0;
  if (typeof parseMathOperation.slice(-1)[0] === 'number') {
    mathOperationBuilder = Number(parseMathOperation[0]);
  } else {
    mathOperationBuilder = parseMathOperation[0];
  }
  return mathOperationBuilder;
};

const validateAllAssumptionsToMathOperation = (checkNumbers, parseMathOperation, mathOperationBuilder, newInput) => {
  if (checkNumbers.indexOf(newInput) >= 0) { // check if it is a number
    mathOperationBuilder += newInput;
  } else if (typeof parseMathOperation.slice(-2)[0] === 'number' || newInput === '(' || newInput === ')') { // check if the predecessor is a number or if the input is ( or )
    mathOperationBuilder += newInput;
  } else if (typeof parseMathOperation.slice(-3)[0] === 'number' && parseMathOperation.slice(-2)[0] === ')') { // check if there is a correct formulation between parenthesis
    mathOperationBuilder += newInput;
  } else {
    console.log('Erro na Formulação Matemática! Revise a operação.');
  }
  return mathOperationBuilder;
};

const createMathOperation = () => {
  const checkNumbers = checkIfInputIsANumber();
  const parseMathOperation = [];
  return $('input').on('click', function () {
    const newInput = $(this).val();
    checkNumbers.indexOf(newInput) >= 0 ? parseMathOperation.push(Number(newInput))
      : parseMathOperation.push(newInput);

    parseMathOperation.length === 1 ? mathOperationBuilder = addFirstInputToMathOperation(parseMathOperation)
      : mathOperationBuilder = validateAllAssumptionsToMathOperation(checkNumbers, parseMathOperation, mathOperationBuilder, newInput);

    console.log(parseMathOperation);
    console.log(mathOperationBuilder);
    displayMathOperation(mathOperationBuilder);
    executeMathOperation(mathOperationBuilder);
  });
};

const executeMathOperation = (...args) => {
  const mathOperationBuilder = args[0];
  const finalMathOperationResult = parseAddOperation(mathOperationBuilder);
  console.log(finalMathOperationResult);
  return displayMathOperationResult(finalMathOperationResult);
};

// ** Parse Math Operations ** //

const parseDivideOperation = (expression) => {
  const numbersString = expression.split('/');
  const numbers = numbersString.map((item) => Number(item));
  const initialDivideValue = numbers[0];
  const multiplyOperationResult = numbers.slice(1).reduce((acc, current) => acc / current, initialDivideValue);
  return multiplyOperationResult;
};

const parseMultiplyOperation = (expression) => {
  const numbersString = expression.split('*');
  const numbers = numbersString.map((item) => parseDivideOperation(item));
  const initialMultiplyValue = 1.0;
  const multiplyOperationResult = numbers.reduce((acc, current) => acc * current, initialMultiplyValue);
  return multiplyOperationResult;
};

const parseMinusOperation = (expression) => {
  const numbersString = expression.split('-');
  const numbers = numbersString.map((item) => parseMultiplyOperation(item));
  const initialSubtractValue = numbers[0];
  const subtractOperationResult = numbers.slice(1).reduce((acc, current) => acc - current, initialSubtractValue);
  return subtractOperationResult;
};

const parseAddOperation = (expression) => {
  const numbersString = expression.split('+');
  const numbers = numbersString.map((item) => parseMinusOperation(item));
  const initialSumValue = 0.0;
  const addOperationResult = numbers.reduce((acc, no) => acc + no, initialSumValue);
  return Number(addOperationResult.toFixed(2));
};

// ** End of Parse Math Operations ** //


$(document).ready(() => {
  createMathOperation();
});
