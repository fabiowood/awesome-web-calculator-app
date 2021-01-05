/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */

const parseExponencialOperation = (expression) => {
  console.log('Exponencial', expression);
  const numbersString = expression.split('e');
  const numbers = numbersString.map((item) => Number(item));
  // console.log('Exponencial', numbers);
  const initialExpValue = numbers[0];
  const exponencialOperationResult = numbers.slice(1).reduce((acc, current) => acc ** current, initialExpValue);
  // console.log(exponencialOperationResult);
  return exponencialOperationResult;
};

const parseDivideOperation = (expression) => {
  console.log('Divide', expression);
  const numbersString = expression.split('/');
  const numbers = numbersString.map((item) => parseExponencialOperation(item));
  // console.log('Divide', numbers);
  const initialDivideValue = numbers[0];
  const multiplyOperationResult = numbers.slice(1).reduce((acc, current) => acc / current, initialDivideValue);
  // console.log(multiplyOperationResult);
  return multiplyOperationResult;
};

const parseMultiplyOperation = (expression) => {
  console.log('Multiply', expression);
  const numbersString = expression.split('*');
  const numbers = numbersString.map((item) => parseDivideOperation(item));
  // console.log('Multiply', numbers);
  const initialMultiplyValue = 1.0;
  const multiplyOperationResult = numbers.reduce((acc, current) => acc * current, initialMultiplyValue);
  // console.log(multiplyOperationResult);
  return multiplyOperationResult;
};

const parseMinusOperation = (expression) => {
  console.log('Subtract', expression);
  const numbersString = expression.split('-');
  console.log(numbersString);
  const numbers = numbersString.map((item) => parseMultiplyOperation(item));
  // console.log('Subtract', numbers);
  const initialSubtractValue = numbers[0];
  const subtractOperationResult = numbers.slice(1).reduce((acc, current) => acc - current, initialSubtractValue);
  // console.log(subtractOperationResult);
  return subtractOperationResult;
};

const parseAddOperation = (expression) => {
  console.log('Add', expression);
  const numbersString = expression.split('+');
  const numbers = numbersString.map((item) => parseMinusOperation(item));
  // console.log('Add', numbers);
  const initialSumValue = 0.0;
  const addOperationResult = numbers.reduce((acc, no) => acc + no, initialSumValue);
  console.log(addOperationResult);
  console.log(Number(addOperationResult.toFixed(2)));
  return Number(addOperationResult.toFixed(2));
};

parseAddOperation('2*5-5*2+100/2e5');
