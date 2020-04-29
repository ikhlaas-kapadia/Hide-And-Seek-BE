const generateData = require("./data/generateData");
const mongoose = require("mongoose");
const connectionSettings = require("./connectionSettings.js");
require("dotenv").config();
const { User } = require("../models/users");

const seed = async () => {
  const data = await generateData();
  await User.deleteMany({});
  await User.insertMany(data);
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
