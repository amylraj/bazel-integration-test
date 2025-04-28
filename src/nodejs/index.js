const readline = require('readline');
const TicTacToe = require('@endor-integration/game-logic');
const GameServer = require('./gameServer');
const moment = require('moment');


// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create a new game instance
const game = new TicTacToe();

// Create and start the game state server
const server = new GameServer(game);
server.start();

// Function to display the game board
function displayBoard() {
  const board = game.getBoard();
  console.log('\n');
  for (let i = 0; i < 9; i += 3) {
    console.log(` ${board[i] || ' '} | ${board[i+1] || ' '} | ${board[i+2] || ' '} `);
    if (i < 6) {
      console.log('---+---+---');
    }
  }
  console.log('\n');
}

// Function to handle player moves
function handleMove() {
  displayBoard();
  
  if (game.checkWinner()) {
    const winner = game.currentPlayer === 'X' ? 'O' : 'X';
    console.log(`Player ${winner} wins!`);
    console.log(`Game ended at: ${moment().format('HH:mm:ss')}`);
    rl.close();
    return;
  }
  
  if (game.getBoard().every(cell => cell !== null)) {
    console.log("It's a draw!");
    console.log(`Game ended at: ${moment().format('HH:mm:ss')}`);
    rl.close();
    return;
  }
  
  console.log(`Current player: ${game.currentPlayer}`);
  rl.question('Enter position (0-8): ', (input) => {
    const position = parseInt(input);
    
    if (isNaN(position) || position < 0 || position > 8) {
      console.log('Invalid position. Please enter a number between 0 and 8.');
      handleMove();
      return;
    }
    
    if (game.makeMove(position)) {
      handleMove();
    } else {
      console.log('Position already taken. Try again.');
      handleMove();
    }
  });
}

// Start the game
console.log('Welcome to Tic Tac Toe!');
console.log('Positions are numbered from 0 to 8, left to right, top to bottom.');
console.log('Example board with positions:');
console.log(' 0 | 1 | 2 ');
console.log('---+---+---');
console.log(' 3 | 4 | 5 ');
console.log('---+---+---');
console.log(' 6 | 7 | 8 ');
console.log(`Game started at: ${moment().format('HH:mm:ss')}`);
console.log('Game state is available at http://localhost:3000');

handleMove(); 