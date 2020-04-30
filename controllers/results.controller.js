const { addResult, fetchResults } = require('../models/results.model');

const postResult = (req, res, next) => {
  addResult(req.body)
    .then((newResult) => {
      res.status(201).send({ results: newResult });
    })
    .catch(next);
};

const getResults = (req, res, next) => {
  fetchResults(req.query)
    .then((results) => {
      res.status(200).send({ results });
    })
    .catch(next);
};

module.exports = { postResult, getResults };
