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

const authToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          success: false,
          message: 'Token is not valid',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};

module.exports = {
  encryptPassword,
  authUser,
  generateToken,
  authToken,
};
