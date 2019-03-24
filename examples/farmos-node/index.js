// const farmOS = require('farmos');
const axios = require('axios');

host = 'http://localhost:80';
username = 'farmos';
password = 'farmos';

// farm = farmOS(host, username, password);

const payload = {
  form_id: 'user_login',
  name: username,
  pass: password,
};

const opts = {
  method: 'POST',
  withCredentials: true,
  maxRedirects: 0,
  validateStatus: status => (status >= 200 && status < 400),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'json',
  },
  data: `name=${payload.name}&pass=${payload.pass}&form_id=${payload.form_id}`,
}

return axios('/user/login', opts)
  .then(res => {
    console.log(res.headers['set-cookie']);
    opts.headers['Cookie'] = res.headers['set-cookie']
    axios('/restws/session/token', opts)
      .then(res => console.log(res.data))
      .catch(console.error)
  })
  .catch(console.error);


// farm.authenticate().catch(console.error);
// farm.term.get('farm_crops').then(console.log).catch(console.error);