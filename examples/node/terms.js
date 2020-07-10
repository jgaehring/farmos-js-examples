const { session, farm } = require('./oauth');

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

session
  .then(() => farm.vocabulary('farm_crops'))
  .then(vocab => vocab.list[0].vid)
  // Uncomment the following line if 'Cabbage' hasn't been created yet.
  // .then(vid => farm.term.send(sampleTerm))
  .then(vid => farm.term.send({
    // name: "Cabbage",
    tid: '27',
    // description: 'you know... cabbage',
    maturity_days: 60,
    vocabulary: {
      id: vid,
    },
  }))
  .then(() => farm.term.get('farm_crops'))
  .then(terms => console.log('terms: ', terms))
  .catch(console.error);
