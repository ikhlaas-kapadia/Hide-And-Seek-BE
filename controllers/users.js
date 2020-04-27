const { fetchUser, registerUser } = require("../models/users");

const getUser = (req, res, next) => {
  fetchUser().then((users) => {
    res.send(users);
  });
};

const postUser = (req, res, next) => {
  registerUser(req.body).then((newUser) => {
    res.status(201).send(newUser);
  });
};

module.exports = { getUser, postUser };
