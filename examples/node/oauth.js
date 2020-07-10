const farmOS = require('farmos');

const host = 'http://localhost';
const username = 'farm';
const password = 'farm';

let token;
const getToken = () => token;
const setToken = t => { token = t; };

const farm = farmOS(host, {
	clientId: 'farm_client',
	getToken,
	setToken,
});

const session = farm.authorize(username, password);

module.exports = { farm, session };