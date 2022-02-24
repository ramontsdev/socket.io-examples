import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import socketIoClient from 'socket.io-client'



function App() {

  useEffect(() => {
    const socket = socketIoClient('http://localhost:8080', {
      transports: ['websocket'],
      forceNew: true,
      upgrade: false,
    })

    socket.on('connect', () => {
      console.log('Connection is success!')
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
