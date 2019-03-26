const farmOS = require('farmos');

const host = 'http://localhost:80';
const username = 'farmos';
const password = 'farmos';

const farm = farmOS(host, username, password);

farm.authenticate()
  .then(token => console.log('token: ', token))
  .then(() => farm.log.get({
    type: [
      'farm_observation',
      'farm_activity',
      'farm_harvest',
      // 'farm_input',
    ],
    log_owner: 1,
    // done: 0,
    // page: 1,
  }))
  .then(logs => console.log('Number of logs: ', logs.length))
  .catch(console.error);
