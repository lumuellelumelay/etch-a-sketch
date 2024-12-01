// Function helper for color generator
const colorGeneratorManager = {
  colorRandomizer() {
    return Math.floor(Math.random() * 256);
  },

  colorGenerator(opacity = 0) {
    const r = this.colorRandomizer();
    const g = this.colorRandomizer();
    const b = this.colorRandomizer();

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
};

// Grid Manager Module
const GridManager = {
  // creating cell for grid
  createGrid() {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    return grid;
  },

  // generating row for grid
  createRow() {
    const row = document.createElement('div');
    row.classList.add('row');
    return row;
  },

  // generating grid
  gridGenerator(size) {
    const gridContainer = document.querySelector('#grid-container');
    gridContainer.replaceChildren();

    for (let i = 0; i < size; i++) {
      const row = this.createRow();
      for (let k = 0; k < size; k++) {
        const grid = this.createGrid();

        // generating the colors for the grid
        const gridColor = colorGeneratorManager.colorGenerator();
        grid.style.backgroundColor = gridColor;

        // initial opacity
        let opacity = 0;

        grid.addEventListener('mouseover', (e) => {
          let currentGrid = e.target;

          // adding opacity 0.1 per hover
          const newOpacity = () => {
            opacity += 0.1;

            // Extracting color from the current grid
            const rgbCheck = currentGrid.style.backgroundColor.match(/\d+/g);
            if (rgbCheck) {
              const [r, g, b] = rgbCheck;
              currentGrid.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            }
            return opacity;
          };
          newOpacity();
        });

        row.appendChild(grid);
      }
      gridContainer.appendChild(row);
    }
  },
};

// Input Validator Module
const InputValidator = {
  // checking users input
  checkInput(inputValue) {
    const numValue = Number(inputValue.trim());

    // validate input
    if (isNaN(numValue)) {
      this.showErrorMessage('Please enter a valid number!');
      return null;
    }

    if (numValue < 1 || numValue > 100) {
      this.showErrorMessage('Please enter a number between 1 and 100');
      return null;
    }

    if (Number.isInteger(numValue)) {
      this.showGridMessage(`The grid is ${numValue} x ${numValue}`);
      return numValue;
    } else {
      const roundedNumValue = Math.round(numValue);
      this.showGridMessage(
        `${numValue} is a float! rounded to ${roundedNumValue}`
      );
      return roundedNumValue;
    }
  },

  showErrorMessage(message) {
    const errorMessage = document.querySelector('.display-message');
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
  },

  showGridMessage(message) {
    const gridMessage = document.querySelector('.display-message');
    if (gridMessage) {
      gridMessage.textContent = message;
      gridMessage.style.display = 'block';
    }
  },
};

// Event Handling Module
const EventHandler = {
  initial() {
    const userInput = document.querySelector('#userInput');
    const button = document.querySelector('button');

    // if the user pressed the button
    button.addEventListener('click', this.sumbitHandler.bind(this));

    // if the user pressed enter
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sumbitHandler(e);
      }
    });
  },

  sumbitHandler(event) {
    event.preventDefault();

    const userInput = document.querySelector('#userInput');
    const inputValue = userInput.value;
    userInput.value = '';

    // checking and processing input
    const validSize = InputValidator.checkInput(inputValue);

    // create grid if input is valid
    if (validSize) {
      GridManager.gridGenerator(validSize);
    }
  },
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  EventHandler.initial();
});
