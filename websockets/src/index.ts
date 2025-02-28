// // import webSocketServer
// import { WebSocketServer } from "ws";

// // Server Setup:
// // This creates a WebSocket server instance that listens on port 8080.
// const wss = new WebSocketServer({ port: 8080 });

// // Handling New Connections:
// // When a client connects, the server logs "user connected".
// // The socket object represents the connection to that specific client.
// wss.on("connection", function (socket) {
//   console.log("user connected");

//   // Handling Messages from the Client:
//   // When the server receives a message from the client, it checks if the message is "ping".
//   // If the message is "ping", the server sends "pong" back to the client using socket.send().
//   socket.on("message", (e) => {
//     if (e.toString() === "ping") {
//       socket.send("pong");
//     }
//   });
// });

// /* 
// wss: Represents the WebSocket server. It manages all client connections and triggers events like connection when a new client connects.

// socket: Represents a specific connection to a client. It is used to send messages to or receive messages from that client. */

