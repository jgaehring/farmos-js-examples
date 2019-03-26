const farmOS = require('farmos');

host = 'http://localhost:80';
username = 'farmos';
password = 'farmos';

farm = farmOS(host, username, password);

farm.authenticate()
  .then(token => console.log('token: ', token))
  .then(() => farm.logout())
  .catch(console.error);
