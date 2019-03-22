import React, { useState, useEffect } from 'react';
import Prism from 'prismjs'

const Terms = ({ farm }) => {
  const [ termResponse, setTermResponse ] =  useState('Response will appear here.');
  const [ termParams, setTermParams ] = useState('VOCAB');
  const [ vocabulary, setVocabulary ] = useState('farm_crops');
  const [ termName, setTermName ] = useState('Icicle Radish');
  const [ termPage, setTermPage ] = useState('0');

  useEffect(() => {
    Prism.highlightAll();
  }, [ termResponse ])

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
      <form>
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
    )

};

export default Terms;