import React, { useState } from 'react';
import axios from 'axios';
import '../fotter/fotter.css';



function Fotter() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
  

    const sendMessage = async (e) => {
        e.preventDefault();
        const userMessage = input;
        setMessages([...messages, { sender: 'User', text: userMessage }]);
        setInput('');

        try {
            const response = await axios.post('http://localhost:3000/api/chat', { message: userMessage });
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'Bot', text: response.data.response }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <h1>Chatbot</h1>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Fotter;

