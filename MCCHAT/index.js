import fs from 'fs';
import chokidar from 'chokidar';
import { WebSocketServer, WebSocket } from 'ws'; // Import both WebSocketServer and WebSocket

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

const logPath = "C:\\Users\\arona22\\Desktop\\MultiMC\\instances\\1.20.4\\.minecraft\\logs\\latest.log";

const sendToClients = message => {
    console.log("Sending message to clients:", message);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) { // Correct usage of WebSocket.OPEN
            client.send(message);
        }
    });
};

const processLine = line => {
    if (line.includes("[Render thread/INFO]: [CHAT]")) {
        sendToClients(line);
    }
};

const follow = filePath => {
    let lastSize = fs.statSync(filePath).size;

    setInterval(() => {
        let currentSize = fs.statSync(filePath).size;
        if (currentSize > lastSize) {
            let stream = fs.createReadStream(filePath, {
                start: lastSize,
                end: currentSize
            });

            stream.on('data', data => {
                const lines = data.toString('utf-8').split(/\r?\n/);
                lines.forEach(line => processLine(line));
            });

            lastSize = currentSize;
        }
    }, 1000); // Check every second
};

follow(logPath);
