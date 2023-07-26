import { WebSocketServer } from 'ws';

let clients = [];

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    clients.push(ws);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
        ws.send('board', data);
        clients.forEach((client) => {
            client.send(data.toString());
        });

    });

    ws.send('something');
});