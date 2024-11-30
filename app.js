const inputContainer = document.querySelector('#input-container');
const gridContainer = document.querySelector('#grid-container');
const userInput = document.querySelector('#userInput');
const button = document.querySelector('button');

let tempNumber = 0;

// Need to do
// Features:
// ------ Able to change color
// ------ Able to delete the grid
// ------ Able to clear the grid
// ------ Able to change the size of the grid accorinding to the size of the H(value) x W(value)
// ------ Able to make the the grid darker when it pass through again
// Main Feature:
// ------ Mousehover

// Function to create grids
const createGrid = function (number) {
  // creating rows
  for (let i = 0; i < number; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    gridContainer.appendChild(row);

    // generating cell for grids
    for (let k = 0; k < number; k++) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      row.appendChild(grid);
    }
  }
};

// Function to clear the grids
const clearGrid = function (number) {
  for (let i = 0; i < number; i++) {
    const rows = document.querySelector('.row');
    gridContainer.removeChild(rows);
  }
};

// Helper function to check if the grid is existing
function gridExist(number) {
  if (number === 0) {
    createGrid(number);
    tempNumber = number;
  } else {
    clearGrid(tempNumber);
    createGrid(number);
    tempNumber = number;
  }
}

// Function to add the grid to the gridContainer
const addGrid = function () {
  const inputValue = userInput.value;
  userInput.value = '';

  // checking if the user's input is a number
  if (isNaN(Number(inputValue))) {
    console.log(`${inputValue} not a number!`);
  } else {
    let numValue = Number(inputValue);

    // checking if the number is within the range of 1 to 100
    if (numValue > 0 && numValue < 101) {
      if (Number.isInteger(numValue)) {
        console.log(`${numValue} is a number`);
        gridExist(numValue);
      } else {
        console.log(
          `${numValue} is a float, rounded to ${Math.round(numValue)}`
        );
        gridExist(numValue);
      }
    } else {
      console.log('Please enter a valid number between 0 and 100!');
    }
  }
};

button.addEventListener('click', addGrid);
