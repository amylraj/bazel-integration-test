const _ = require('lodash');

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
    }

    makeMove(position) {
        if (this.board[position] || this.checkWinner()) {
            return false;
        }
        this.board[position] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        return true;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return _.find(winPatterns, pattern => {
            const [a, b, c] = pattern;
            return this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c];
        });
    }

    getBoard() {
        return _.cloneDeep(this.board);
    }

    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
    }
}

module.exports = TicTacToe; 