import { reactive } from "vue";
import { io } from 'socket.io-client';

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object


export const socket = io("http://localhost:3000");

socket.on("connect", () => {
    state.connected = true;
    console.log("connected");
});

socket.on("disconnect", () => {
    state.connected = false;
    console.log("disconnected");

});

socket.on("foo", (...args) => {
    state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
    state.barEvents.push(args);
});