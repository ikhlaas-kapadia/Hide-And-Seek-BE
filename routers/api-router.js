const apiRouter = require('express').Router();
const { usersRouter } = require('../routers/users-router');
const { resultsRouter } = require('../routers/results-router');

apiRouter.use('/users', usersRouter);
apiRouter.use('/results', resultsRouter);

module.exports = { apiRouter };
