exports.handleErrors = (err, req, res, next) => {
  console.log(err.status)
  if (err.status === 401) {
    res.status(401).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "something went wrong." });
  }
};
