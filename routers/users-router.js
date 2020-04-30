const usersRouter = require('express').Router();

const { loginUser, postUser } = require('../controllers/users.controller');

usersRouter.route('/login').post(loginUser);
usersRouter.route('/register').post(postUser);

module.exports = { usersRouter };
