const farmOS = require('farmos');

const host = 'http://localhost:80';
const username = 'farmos';
const password = 'farmos';

const farm = farmOS(host, username, password);

const arrayOfInts = new Array(150).fill().map((el, i) => ++i)

farm.authenticate()
  .then(token => console.log('token: ', token))
  .then(() => farm.log.get(arrayOfInts))
  .then(logs => console.log('Number of logs: ', logs.list.length))
  .catch(console.error);
