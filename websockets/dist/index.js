"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import webSocketServer
const ws_1 = require("ws");
// create the webSocketServer
const wss = new ws_1.WebSocketServer({ port: 8080 });
// event handler
wss.on("connection", function (socket) {
    console.log("user connected");
    socket.on("message", (e) => {
        if (e.toString() === "ping") {
            socket.send("pong");
        }
    });
});
