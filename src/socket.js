// import { createServer } from 'http';
// import { WebSocketServer } from 'ws';

// function onSocketError(err) {
//     console.error(err);
// }

// const server = createServer();
// const wss = new WebSocketServer({ noServer: true });

// wss.on('connection', function connection(ws, request, client) {
//     ws.on('error', console.error);

//     ws.on('message', function message(data) {
//         console.log(`Received message ${data} from user ${client}`);
//     });
// });

// server.on('upgrade', function upgrade(request, socket, head) {
//     socket.on('error', onSocketError);

//     // This function is not defined on purpose. Implement it with your own logic.
//     authenticate(request, function next(err, client) {
//         if (err || !client) {
//             socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
//             socket.destroy();
//             return;
//         }

//         socket.removeListener('error', onSocketError);

//         wss.handleUpgrade(request, socket, head, function done(ws) {
//             wss.emit('connection', ws, request, client);
//         });
//     });
// });

// server.listen(3000);

// export { server }