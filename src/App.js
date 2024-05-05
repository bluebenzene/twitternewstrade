import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './Message';

function App() {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('wss://wss.phoenixnews.io/');
    let pingInterval = null;

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
      pingInterval = setInterval(() => {
        if(ws.readyState === WebSocket.OPEN) {
          ws.send('ping');
          console.log('Ping sent');
        }
      }, 30000);
    };

    ws.onmessage = (event) => {
      if(event.data === "pong") {
        console.log('Pong received');
        return;
      }
      setMessages(prev => [event.data, ...prev]);
      console.log('Message received: ', event.data);
    };

    ws.onerror = () => {
      console.error('WebSocket Error');
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
      clearInterval(pingInterval);
      setIsConnected(false);
    };

    return () => {
      if (ws) {
        ws.close();
      }
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Status: {isConnected }
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
        </p>
        {messages.map((msg, index) => (
          <Message key={index} data={msg} />
        ))}
      </header>
    </div>
  );
}

export default App;