const { session, farm } = require('./oauth');

session
	.then(() => farm.area.geojson())
	.then(console.log);