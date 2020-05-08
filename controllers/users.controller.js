const {
  signInUser,
  registerUser,
  updateUser,
} = require('../models/users.model');

const loginUser = (req, res, next) => {
  signInUser(req.body)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

const postUser = (req, res, next) => {
  registerUser(req.body)
    .then((newUser) => {
      res.status(201).send({ user: newUser });
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  updateUser(req)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { loginUser, postUser, patchUser };
