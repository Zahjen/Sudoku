const inputList = document.querySelectorAll('input')
const checkMistake = document.querySelector('#checkMistake');
const mistakeColor = 'rgba(208, 126, 255, 0.3)';
const size = 9;
let colorArray = ['rgb(224, 201, 224)', 'rgb(208, 208, 245)', 'rgb(204,255,255)', 'rgb(204, 255, 204)', 'rgb(255,255,204)', 'rgb(255,204,153)', 'rgb(230, 166, 166)', 'rgb(201, 184, 165)', 'rgb(216, 224, 209)'];

class Coord {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

function createCoordArray(array) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            array.push(new Coord(i,j));
        }
    }
}

function transposeCoord(array) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            array.push(new Coord(j,i));
        }
    }
}

function shuffleCoord(array) { 
    createCoordArray(array)

    for (var i = array.length - 1; i > 0; i--) {  
        var randomIndex = Math.floor(Math.random() * (i + 1));         
        var temporaryValue = array[i]; 
        array[i] = array[randomIndex]; 
        array[randomIndex] = temporaryValue; 
    }   
    return array; 
} 

function grid(array, bigArray) {
    let row = [];
    for (let i = 0; i < array.length ; i++) {
        row.push(array[i])
        if (row.length === size) {
            bigArray.push(row);
            row = [];
        }
    }
}


function gridValue(array, bigArray) {
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
}

function checkRow(array, arrayValue) {
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

/* -------------------------------------------------------------------------------- */

    let rowArray = [];
    let gridRowArray = [];
    createCoordArray(rowArray);
    grid(rowArray, gridRowArray);

    let columnArray = [];
    let gridColumnArray = [];
    transposeCoord(columnArray);
    grid(columnArray, gridColumnArray);

    let shapeArray = [];
    let gridShapeArray = [];
    shuffleCoord(shapeArray);
    grid(shapeArray, gridShapeArray);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            document.querySelector(`#cell_${gridShapeArray[i][j].x}-${gridShapeArray[i][j].y}`).style.backgroundColor = colorArray[i];
        }
    }



/* -------------------------------------------------------------------------------- */

function check() {
    // We take every input and check their validity, i.e. the value is between 1 and the size, and if it is not the case, then we are not executiing the code for the not valid input 
    inputList.forEach(e => {
        if (e.checkValidity() === false) {
            // a changer pour juste return
            alert(`le nombre ne peux pas être plus grand que ${size}`)
            throw new ReferenceError(`le nombre ne peux pas être plus grand que ${size}`);
        }
    });

    
    let rowArrayValue = [];
    gridValue(rowArray, rowArrayValue)

    let columnArrayValue = [];
    gridValue(columnArray, columnArrayValue);

    let shapeArrayValue = [];
    gridValue(shapeArray, shapeArrayValue);
    
    checkRow(gridRowArray, rowArrayValue);
    checkRow(gridColumnArray, columnArrayValue);
    checkRow(gridShapeArray, shapeArrayValue);

}



checkMistake.addEventListener('click', check);