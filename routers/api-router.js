const apiRouter = require("express").Router();
const { usersRouter } = require("../routers/users-router");

apiRouter.use("/users", usersRouter);

module.exports = { apiRouter };
