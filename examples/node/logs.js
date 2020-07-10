const { session, farm } = require('./oauth');

session
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
  .then(r => console.log('Number of logs: ', r.list.length))
  .catch(console.error);
