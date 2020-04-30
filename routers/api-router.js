const apiRouter = require('express').Router();
const { usersRouter } = require('../routers/users-router');
const { resultsRouter } = require('../routers/results-router');
const { authToken } = require('../utils/auth-util');

apiRouter.use('/users', usersRouter);
apiRouter.use('/results', authToken, resultsRouter);

module.exports = { apiRouter };
