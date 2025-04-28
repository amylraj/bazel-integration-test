const http = require('http');

class GameServer {
    constructor(game, port = 3000) {
        this.port = port;
        this.game = game;
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    handleRequest(req, res) {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }

        // Only handle GET requests to root path
        if (req.method === 'GET' && req.url === '/') {
            const state = {
                board: this.game.getBoard(),
                currentPlayer: this.game.currentPlayer,
                winner: this.game.checkWinner()
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(state));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not found' }));
        }
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Game state server running at http://localhost:${this.port}`);
        });
    }
}

module.exports = GameServer; 