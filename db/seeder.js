const generateData = require('./data/generateData');
const mongoose = require('mongoose');
const connectionSettings = require('./connectionSettings.js');
require('dotenv').config();
const { User } = require('../models/users.model');
const { Result } = require('../models/results.model');

const seed = async () => {
  const { userData, resultsData } = await generateData();
  await User.deleteMany({});
  await Result.deleteMany({});
  await User.insertMany(userData);
  await Result.insertMany(resultsData);
};

const closeDB = async () => {
  await mongoose.disconnect();
};

const openConnection = async () => {
  const dbUrl = connectionSettings();
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
  });
};

module.exports = { seed, closeDB, openConnection };
