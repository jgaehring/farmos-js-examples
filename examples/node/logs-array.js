const { session, farm } = require('./oauth');

const arrayOfInts = new Array(150).fill().map((el, i) => ++i)

session
  .then(token => console.log('token: ', token))
  .then(() => farm.log.get(arrayOfInts))
  .then(logs => console.log('Number of logs: ', logs.list.length))
  .catch(console.error);
