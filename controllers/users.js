const { signInUser, registerUser } = require("../models/users");

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
      res.status(201).send(newUser);
    })
    .catch(next);
};

module.exports = { loginUser, postUser };
