import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Interface for User
interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];
let userCount = 0;

wss.on("connection", (socket) => {
  userCount += 1;
  console.log(`User connected #${userCount}`);

  // Handling incoming messages from users/clients
  socket.on("message", (message) => {
    let parsedMessage;

    // Safe JSON parsing to prevent crashes
    try {
      parsedMessage = JSON.parse(message.toString());
    } catch (error) {
      console.error("Received non-JSON message:", message.toString());
      return; // Ignore non-JSON messages
    }

    // Handling "join" event
    if (parsedMessage.type === "join") {
      const user = allSockets.find((x) => x.socket === socket);

      if (user) {
        if (user.room === parsedMessage.payload.roomId) {
          console.log(`User is already in room: ${user.room}`);
          return;
        }

        user.room = parsedMessage.payload.roomId;
        console.log(`User switched to room: ${parsedMessage.payload.roomId}`);
      } else {
        const newUser: User = {
          socket,
          room: parsedMessage.payload.roomId,
        };

        allSockets.push(newUser);
        console.log(`New user joined room: ${parsedMessage.payload.roomId}`);
      }
    }

    // Handling "chat" event
    if (parsedMessage.type === "chat") {
      const currentUser = allSockets.find((x) => x.socket === socket);
      if (currentUser) {
        const currentUserRoom = currentUser.room;
        console.log(`Message received in room: ${currentUserRoom}`);

        // Broadcast message to all users in the same room
        allSockets.forEach((user) => {
          if (user.room === currentUserRoom) {
            user.socket.send(
              JSON.stringify({
                type: "chat",
                payload: parsedMessage.payload,
              })
            );
          }
        });
      }
    }
  });

  // Handling disconnection
  socket.on("close", () => {
    allSockets = allSockets.filter((x) => x.socket !== socket);
    userCount -= 1;
    console.log(`User disconnected. Remaining users: ${userCount}`);
  });

  socket.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
});
