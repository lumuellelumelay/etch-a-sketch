const inputContainer = document.querySelector('#input-container');
const userInput = document.querySelector('#userInput');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  const inputValue = userInput.value;
  userInput.value = '';

  // checking if the user's input is a number
  if (isNaN(Number(inputValue))) {
    console.log(`${inputValue} not a number!`);
  } else {
    const numValue = Number(inputValue);

    if (Number.isInteger(numValue)) {
      console.log(`${numValue} is a number`);
    } else {
      console.log(`${numValue} is a float, rounded to ${Math.round(numValue)}`);
    }
  }
});
