import React, { useState, useEffect } from 'react';
import farmOS from 'farmos';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [ host, setHost ] = useState('');
  const [ username, setUsername ] = useState('farmos');
  const [ password, setPassword ] = useState('farmos');
  const [ authStatus, setAuthStatus ] = useState(false);
  const [ working, setWorking ] = useState(false);

  useEffect(() => {
    setWorking(true)
    const farm = () => farmOS(host, username, password);
    farm().authenticate().then(token => {
      console.log(`Your token is: ${token}`);
      setAuthStatus(true);
      setWorking(false);
    }).catch(err => {
      console.error(err);
      setAuthStatus(false)
      setWorking(false);
    });
  }, [ host, username, password ]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <fieldset>
            <legend>To get started, enter your farmOS credentials</legend>
            <div className="input-group">
              <label>Host</label>
              <br/>
              <input
                type='url'
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Username</label>
              <br/>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <br/>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <p id="authStatus">
            {
              (working)
              ? "Loading..."
              : (authStatus)
              ? "Status: Authenticated!"
              : "Status: Not Authenticated"
            }
          </p>
        </form>
      </header>
    </div>
  );
}

export default App;
