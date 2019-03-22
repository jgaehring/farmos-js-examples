import React, { useState, useEffect } from 'react';
import Prism from 'prismjs'
import farmOS from 'farmos';
import logo from './logo.svg';
import './App.css';
import './prism.css';

const App = () => {
  const [ host, setHost ] = useState('');
  const [ username, setUsername ] = useState('farmos');
  const [ password, setPassword ] = useState('farmos');
  const [ authStatus, setAuthStatus ] = useState(false);
  const [ working, setWorking ] = useState(false);

  const [ termResponse, setTermResponse ] =  useState('Response will appear here.');
  const [ termParams, setTermParams ] = useState('VOCAB');
  const [ vocabulary, setVocabulary ] = useState('farm_crops');
  const [ termName, setTermName ] = useState('Icicle Radish');
  const [ termPage, setTermPage ] = useState('0');

  const farm = () => farmOS(host, username, password);

  useEffect(() => {
    Prism.highlightAll();
  }, [ termResponse ])

  const onLogin = () => {
    setWorking(true)
    farm().authenticate().then(token => {
      console.log(`Your token is: ${token}`);
      setAuthStatus(true);
      setWorking(false);
    }).catch(err => {
      console.error(err);
      setAuthStatus(false)
      setWorking(false);
    });
  };

  const getTerms = () => {
    if (termParams === 'VOCAB') {
      farm().term.get(vocabulary).then(setTermResponse).catch(console.error)
    }
    if (termParams === 'FILTERS') {
      farm().term.get({
        vocabulary,
        name: termName,
        page: termPage,
      }).then(setTermResponse).catch(console.error)
    } else {
      farm().term.get().then(setTermResponse).catch(console.error)
    }
  }

  const vocabInput = (
    <div className="input-group">
      <label>Vocabulary</label>
      <br/>
      <input
        type='text'
        value={vocabulary}
        onChange={(e) => setVocabulary(e.target.value)}
      />
    </div>
  )

  const filterInput = (
    <React.Fragment>
      <div className="input-group">
        <label>Vocabulary</label>
        <br/>
        <input
          type='text'
          value={vocabulary}
          onChange={(e) => setVocabulary(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Name</label>
        <br/>
        <input
          type='text'
          value={termName}
          onChange={(e) => setTermName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Page</label>
        <br/>
        <input
          type='text'
          value={termPage}
          onChange={(e) => setTermPage(e.target.value)}
        />
      </div>
    </React.Fragment>
  )

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
          <fieldset>
            <legend>Taxonomy Terminologies</legend>
            <div className='input-group'>
              <label>Use Vocabulary</label>
              <input
                type='radio'
                name='term-params'
                value='VOCAB'
                checked={termParams === 'VOCAB'}
                onChange={(e) => setTermParams(e.target.value)}
              />
            </div>
            <div className='input-group'>
              <label>Use Filters</label>
              <input
                type='radio'
                name='term-params'
                value='FILTERS'
                checked={termParams === 'FILTERS'}
                onChange={(e) => setTermParams(e.target.value)}
              />
            </div>
            <div className='input-group'>
              <label>Use No Params</label>
              <input
                type='radio'
                name='term-params'
                value='NONE'
                checked={termParams === 'NONE'}
                onChange={(e) => setTermParams(e.target.value)}
              />
            </div>
            {
              (termParams === 'VOCAB')
              ? vocabInput
              : (termParams === 'FILTERS')
              ? filterInput
              : null
            }
            <button type='button' onClick={getTerms}>Get Terms</button>
          </fieldset>
          <pre>
            <code className='language-javascript'>
              {JSON.stringify(termResponse, null, 2)}
            </code>
          </pre>
        </form>
      </header>
    </div>
  );
}

export default App;
