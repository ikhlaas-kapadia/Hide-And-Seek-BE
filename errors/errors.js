exports.handleErrors = (err, req, res, next) => {
  console.log(err);
  if (err.code === 11000) {
    if (err.keyPattern.email) {
      res.status(401).send({
        msg: 'Email already exists. Please use another email address.',
      });
    }
    if (err.keyPattern.user_name) {
      res.status(401).send({
        msg: 'Username already exists. Please use another username.',
      });
    }
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ msg: `Bad request, Validation Error!` });
  } else if (err.name === 'FileFormat') {
    res.status(400).send({ msg: err.msg });
  } else if (err.status === 401 || err.status === 403) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: 'something went wrong.' });
  }
};
