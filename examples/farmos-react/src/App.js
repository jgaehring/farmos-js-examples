import React, { useEffect } from 'react';
import farmOS from 'farmos';
import logo from './logo.svg';
import './App.css';

const App = () => {
  useEffect(() => {
    const host = '';
    const username = 'farmos';
    const password = 'farmos';
    const farm = farmOS(host, username, password);
    farm.authenticate().then(console.log);
  })
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
