const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

// Serve your static files if needed
app.use(express.static('public'));

// WebSocket endpoint
app.ws('/ws', (ws, req) => {
    console.log('WebSocket connection opened.');

    // WebSocket message event
    ws.on('message', (msg) => {
        console.log('Received message:', msg);

        // Echo the message back to the client
        ws.send(`Server: ${msg}`);
    });

    // WebSocket close event
    ws.on('close', () => {
        console.log('WebSocket connection closed.');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
