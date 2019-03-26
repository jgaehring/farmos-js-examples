const farmOS = require('farmos');

const host = 'http://localhost:80';
const username = 'farmos';
const password = 'farmos';

const farm = farmOS(host, username, password);

const sampleTerm = {
  tid: 3,
  name: "Cabbage",
  description: "you know... cabbage",
  vocabulary: {
    id: 7,
    resource: "taxonomy_vocabulary",
  },
  parent: [
    {
      id: 10,
      resource: "taxonomy_term",
    },
  ],
  weight: 5,
}

let token;

farm.authenticate()
  .then(_token => token = _token)
  .then(() => farm.vocabulary('farm_crops'))
  .then(vocab => vocab.list[0].vid)
  .then(vid => farm.term.send({
    // name: "Cabbage",
    tid: '27',
    // description: 'you know... cabbage',
    maturity_days: 60,
    vocabulary: {
      id: vid,
    },
  }, token))
  .then(() => farm.term.get('farm_crops'))
  .then(terms => console.log('terms: ', terms))
  .catch(console.error);
