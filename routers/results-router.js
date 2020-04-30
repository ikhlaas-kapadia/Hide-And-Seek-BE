const resultsRouter = require('express').Router();

const { postResult, getResults } = require('../controllers/results.controller');

resultsRouter.route('/').post(postResult).get(getResults);

module.exports = { resultsRouter };
