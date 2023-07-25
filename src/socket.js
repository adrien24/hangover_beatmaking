#!/usr/bin/env node
import { Logger } from 'sass';
import { w3cwebsocket } from 'websocket';



var client = new w3cwebsocket('ws://localhost:3000/');

client.

    client.on('connectFailed', function (error) {
        console.log('Connect Error: ' + error.toString());
    });

client.onopen(() => {
    console.log('WebSocket Client Connected');
})


client.onmessage('connect', function (connection) {
    console.log('WebSocket Client Connected');
});



export { client }