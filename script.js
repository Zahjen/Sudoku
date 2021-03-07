const tbody = document.querySelector('tbody');
const selectSize = document.querySelector('.selectSize');
const newGrid = document.querySelector('.newGrid');
const inputSize = document.querySelector('.size');
const inputList = document.querySelectorAll('.inputList')
const checkMistake = document.querySelector('.checkMistake');
const mistakeColor = 'rgba(255, 0, 0, 0.5)';

let colorArray = ['rgb(224, 201, 224)', 'rgb(208, 208, 245)', 'rgb(204,255,255)', 'rgb(204, 255, 204)', 'rgb(255,255,204)', 'rgb(255,204,153)', 'rgb(230, 166, 166)', 'rgb(201, 184, 165)', 'rgb(216, 224, 209)'];

class Coord {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * Get input value to know size entered by user
*/
function getSize() {
    let size = parseInt(inputSize.value, 10);
    return size;
}

/**
 * Generate HTML code to create a grid according to the value wanted by user
*/
function display() {
    let size = getSize();

    for (let i = 0; i < size; i++) {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (let j = 0; j < size; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            td.innerHTML = `
                <td>
                    <input class="inputList" type="number" min="1" max="${size}" step="1" id="cell_${i}-${j}">
                </td>
            `;
        }
    }
}

/**
 * Generate the whole grid and buttons once clicking on the "Generate grid" button
*/
function generateGrid() {
    let size = getSize();

    if (size < 3 || size > 9) {
        alert('Size has to be between 4 and 9');
        inputSize.value = '';
        return;
    }

    display();

    inputSize.style.display = 'none';
    selectSize.style.display = 'none';
    newGrid.style.display = 'block';
    checkMistake.style.display = 'block';

    // After generating of the grid we color ramdomly all the cells 
    let allGrid = array();
    let gridShapeArray = allGrid[7];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            document.querySelector(`#cell_${gridShapeArray[i][j].x}-${gridShapeArray[i][j].y}`).style.backgroundColor = colorArray[i];
        }
    }
}

/**
 * Allows us to come back on the page asking to select the size in order to play a new game again
*/
function newGame() {
    tbody.innerHTML = '';
    inputSize.value = '';

    inputSize.style.display = 'block';
    selectSize.style.display = 'block';
    newGrid.style.display = 'none';
    checkMistake.style.display = 'none';
}

/**
 * Returns an ordered array of coordionates
*/
function createCoordArray() {
    let size = getSize();
    let array = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            array.push(new Coord(i,j));
        }
    }

    return array;
}

/**
 * Returns an ordered transpose array coordinates
*/
function transposeCoord() {
    let size = getSize();
    let array = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            array.push(new Coord(j,i));
        }
    }

    return array;
}

/**
 * After creating an ordered array, it shuffles the ordered array to have random coordinates array
*/
function shuffleCoord() { 
    let array = createCoordArray();

    for (var i = array.length - 1; i > 0; i--) {  
        var randomIndex = Math.floor(Math.random() * (i + 1));         
        var temporaryValue = array[i]; 
        array[i] = array[randomIndex]; 
        array[randomIndex] = temporaryValue; 
    }   

    return array; 
} 

/**
 * @param array 
 * 
 * This function accepts a coordinates array and creates an array of array to simulate a sudoku grid only containig coordinates
*/
function grid(array) {
    let size = getSize();
    let bigArray = [];
    let row = [];

    for (let i = 0; i < array.length ; i++) {
        row.push(array[i])
        if (row.length === size) {
            bigArray.push(row);
            row = [];
        }
    }

    return bigArray;
}

/**
 * @param array 
 * 
 * This function entering a sudoku grid containing coordinates and creates an array of array to simulate a sudoku grid conataining all the values of each sudoku cells
*/
function gridValue(array) {
    let size = getSize();
    let bigArray = [];
    let row = [];

    for (let i = 0; i < array.length ; i++) {
        let inputValue = document.querySelector(`#cell_${array[i].x}-${array[i].y}`).value;
        let numInputValue = (inputValue !== '') ? parseInt(inputValue, 10) : '';
        row.push(numInputValue)
        if (row.length === size) {
            bigArray.push(row);
            row = [];
        }
    }

    return bigArray;
}

/**
 * This function is just declaring all the needed arrays
*/
function array() {
    let rowArray = createCoordArray();
    let gridRowArray = grid(rowArray);
    let rowArrayValue = gridValue(rowArray);

    let columnArray = transposeCoord();
    let gridColumnArray = grid(columnArray);
    let columnArrayValue = gridValue(columnArray);

    let shapeArray = shuffleCoord();
    let gridShapeArray = grid(shapeArray);
    let shapeArrayValue = gridValue(shapeArray);

    return [rowArray, gridRowArray, rowArrayValue, columnArray, gridColumnArray, columnArrayValue, shapeArray, gridShapeArray, shapeArrayValue]
}

/**
 * @param array 
 * @param arrayValue 
 * 
 * This function is just checking if there already is the same value in the row, column or shape of the sudoku grid and if it is the case it colors the cell with red color
*/
function checkRow(array, arrayValue) {
    let size = getSize();

    for(let i = 0; i < size; i++) {
        let double = [];

        for (let j = 0; j < size; j++) {
            let sudokuCheckDouble = arrayValue[i][j];

            if (sudokuCheckDouble === '') { }
            else if (double.includes(sudokuCheckDouble)) {
                document.querySelector(`#cell_${array[i][j].x}-${array[i][j].y}`).style.backgroundColor = mistakeColor;
            }
            else {
                double.push(sudokuCheckDouble)
            }
        }
    }
}

/**
 * We are just applying the check() function for the row, the column and the shape of the sudoku grid once clicked on checkMistake button
*/
function check() {
    let allGrid = array();

    let gridRowArray = allGrid[1];
    let rowArrayValue = allGrid[2];

    let gridColumnArray = allGrid[4];
    let columnArrayValue = allGrid[5];

    let gridShapeArray = allGrid[7];
    let shapeArrayValue = allGrid[8];
    
    checkRow(gridRowArray, rowArrayValue);
    checkRow(gridColumnArray, columnArrayValue);
    checkRow(gridShapeArray, shapeArrayValue);
}


checkMistake.addEventListener('click', check);
selectSize.addEventListener('click', generateGrid);
newGrid.addEventListener('click', newGame);
