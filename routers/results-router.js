const resultsRouter = require('express').Router();
const { postResult, getResults } = require('../controllers/results.controller');

resultsRouter.post('/', postResult);
resultsRouter.get('/', getResults);

module.exports = { resultsRouter };
