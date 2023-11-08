import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Initialize WebSocket connection
        const ws = new WebSocket('wss://dev-chatbot.omnivoltaic.com/ws');
        setSocket(ws);

        ws.onmessage = (message) => {
            // Assuming the server sends back JSON with a 'text' field
            const response = JSON.parse(message.data);
            addResponseMessage(response.text);
        };

        // Clean up on unmount
        return () => ws.close();
    }, []);

    const handleNewUserMessage = (newMessage) => {
        // Send the message through the WebSocket
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ message: newMessage }));
        }
    };

    return (
        <div className="App">
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Chatbot"
                subtitle="Ask me anything!"
            />
        </div>
    );
}

export default App;
