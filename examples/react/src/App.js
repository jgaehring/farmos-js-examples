import React, { useState, useEffect } from 'react';
import farmOS from 'farmos';
import Terms from './components/Terms'
import logo from './logo.svg';
import './App.css';
import './prism.css';

const App = () => {
  const [ host, setHost ] = useState('');
  const [ username, setUsername ] = useState('farmos');
  const [ password, setPassword ] = useState('farmos');
  const [ authStatus, setAuthStatus ] = useState(false);
  const [ working, setWorking ] = useState(false);

  const farm = () => farmOS(host, username, password);

  useEffect(() => {
    if (window.localStorage.getItem('token') !== null) {
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  }, [ working ])

  const onLogin = () => {
    setWorking(true)
    farm().authenticate().then(token => {
      window.localStorage.setItem('token', token);
      setAuthStatus(true);
      setWorking(false);
    }).catch(err => {
      console.error(err);
      setAuthStatus(false)
      setWorking(false);
    });
  };

  const onLogout = () => {
    setWorking(true);
    farm().logout().then(res => {
      window.localStorage.removeItem('token');
      setAuthStatus(false);
      setWorking(false);
    })
    .catch(() => { setWorking(false); });
  }

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
            <button type='button' onClick={onLogin}>Login</button>
            <button type='button' onClick={onLogout}>Logout</button>
          </fieldset>
          <p id="authStatus">
            {
              (working)
              ? "Authenticating..."
              : (authStatus)
              ? "Status: Authenticated!"
              : "Status: Not Authenticated"
            }
          </p>
        </form>
      </header>
      <main>
        <Terms farm={farm} />
      </main>
    </div>
  );
}

export default App;
