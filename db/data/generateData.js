const { encryptPassword } = require('../../utils/auth-util');

const generateData = async () => {
  let dataPath;
  if (process.env.NODE_ENV === 'test') dataPath = 'test-data';
  else if (process.env.NODE_ENV === 'dev') dataPath = 'development-data';
  else if (process.env.NODE_ENV === 'production') dataPath = 'production-data';
  const userData = require(`../data/${dataPath}/users`);
  const resultsData = require(`../data/${dataPath}/results`);
  for (let i = 0; i < userData.length; i++) {
    userData[i].password = await encryptPassword(userData[i].password);
  }
  return { userData, resultsData };
};

module.exports = generateData;
