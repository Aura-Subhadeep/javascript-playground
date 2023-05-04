const statusDisplay = document.getElementById('game-status');

// Define two functions to generate messages for when the game ends
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Define variables to keep track of game stat
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

// Display whose turn it is to start the game
statusDisplay.innerHTML = currentPlayerTurn();

// Define a function to handle when a cell is clicked on
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Update the game state with the current player's symbol
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer
    if ( currentPlayer == "X" ) { 
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "blue";
    }else{
        document.querySelectorAll('.cell')[clickedCellIndex].style.color = "red";
    }
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Define a function to handle changing the player's turn
function handlePlayerChange() {
    // Switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    // Display whose turn it is
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Define an array of arrays that specify the winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Define a function to handle checking for a win or draw
function handleResultValidation() {
    let roundWon = false;
    // Loop through each winning combination
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        // If any cell is empty, skip this combination
        if (a === '' || b === '' || c === '') {
            continue;
        }
        // If all three cells contain the same symbol, a player has won
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    // If a player has won, display the winning message and end the game
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    // If all cells are full and no player has won, the game is a draw
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    // If the game is still ongoing, switch to the other player's turn
    handlePlayerChange();
}

// Define a function to handle a cell being clicked on
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // Get the index of the clicked cell from its 'data-cell-index' attribute
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    // Check if the cell has already been played or if the game is not active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    // Mark the clicked cell as played by the current player, update the game state, and validate the game result
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Define a function to handle the restart game button
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    // Clear the contents of all cells on the game board
    document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "");
}

// Add event listeners for clicking on game cells and the restart game button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById("game-restart").addEventListener('click', handleRestartGame);