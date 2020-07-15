const { session, farm } = require('./oauth');

const date = new Date();

const log = {
  name: `Node Test Log - ${date.toLocaleString()}`,
  type: 'farm_observation',
  timestamp: Math.floor(date.valueOf() / 1000),
};

session
  .then(() => farm.log.send(log))
  .then(res => farm.log.get(res.id))
  .then(res => {
    console.log(res.list[0].name);
    
    const newDate = new Date();
    const updatedLog = {
      id: res.list[0].id,
      name: `Node Test Log - ${newDate.toLocaleString()}`,
      timestamp: Math.floor(newDate.valueOf() / 1000),
    };
    
    return farm.log.send(updatedLog);
  })
  .then(res => farm.log.get(res.id))
  .then(res => { console.log(res.list[0].name); })
  .catch(console.error);
