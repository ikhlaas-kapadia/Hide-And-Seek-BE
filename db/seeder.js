const generateData = require("./data/generateData");
require("dotenv").config();
require("../db/connection");
const { User } = require("../models/users");

const seed = async () => {
  const data = await generateData();
  await User.deleteMany({});
  await User.insertMany(data);
};

seed();
