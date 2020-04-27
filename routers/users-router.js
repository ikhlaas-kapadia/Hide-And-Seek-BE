const usersRouter = require("express").Router();

const { getUser, postUser } = require("../controllers/users");

usersRouter.route("/").get(getUser);
usersRouter.route("/register").post(postUser);

module.exports = { usersRouter };
