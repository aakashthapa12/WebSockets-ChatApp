import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  function sendMessage() {
    if (!socket) return;
    const message = inputRef.current.value;
    //@ts-ignore
    socket.send(message);
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    // Receiving message from server
    ws.onmessage = (e) => {
      alert(e.data);
    }
  }, []);
  
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Message..."></input>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App



/* Chronological Flow
Let’s summarize the chronological flow of your code:

Component Mounts:
The App component is rendered for the first time.
socket is initialized as undefined.
inputRef is created.

useEffect Runs:
A WebSocket connection is created (ws).
The socket state is updated with the new WebSocket object (ws).
An event listener (ws.onmessage) is set up to handle incoming messages.

UI Renders:
The <input> field and <button> are displayed.

User Interaction:
The user types a message and clicks "Send".
The sendMessage function sends the message to the server.
The server responds, and the message is displayed in an alert. */


/* User Interaction

User Types a Message:
The user types a message (e.g., "ping") into the <input> field.

User Clicks "Send":
The sendMessage function is called:
It retrieves the message ("ping") from the <input> field.
It sends the message to the server using socket.send("ping").

Server Responds:
The server receives "ping" and sends back "pong".
The ws.onmessage event listener is triggered:
The message ("pong") is displayed in an alert box. */
