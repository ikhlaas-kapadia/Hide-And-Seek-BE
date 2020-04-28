const { encryptPassword } = require('../../utils/file-auth');
const devData = require('../data/development-data/users');
const testData = require('../data/test-data/users');
const prodData = require('../data/production-data/users');

const generateData = async () => {
  let data;
  if (process.env.NODE_ENV === 'test') data = testData;
  else if (process.env.NODE_ENV === 'dev') data = devData;
  else if (process.env.NODE_ENV === 'production') data = prodData;

  for (let i = 0; i < data.length; i++) {
    data[i].password = await encryptPassword(data[i].password);
  }
  return data;
};

module.exports = generateData;
