const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const encryptPassword = async (plainText) => {
  const hashed = await bcrypt.hash(plainText, saltRounds);
  return hashed;
};

const authUser = async (plainText, hash) => {
  const checked = await bcrypt.compare(plainText, hash);
  return checked;
};

const generateToken = (user_name) => {
  const token = jwt.sign({ user_name }, process.env.TOKEN_SECRET);
  return token;
};

module.exports = {
  encryptPassword,
  authUser,
  generateToken,
};
