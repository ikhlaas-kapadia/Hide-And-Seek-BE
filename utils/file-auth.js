const bcrypt = require("bcrypt");

const saltRounds = 10;

const encryptPassword = async (plainText) => {
  const hashed = await bcrypt.hash(plainText, saltRounds);
  return hashed;
}

module.exports = {
  encryptPassword
}
