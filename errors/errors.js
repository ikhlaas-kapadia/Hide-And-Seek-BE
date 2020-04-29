exports.handleErrors = (err, req, res, next) => {
  if (err.code === 11000) {
    if (err.keyPattern.email) {
      res.status(401).send({
        msg: "Email already exists. Please use another email address.",
      });
    }
    if (err.keyPattern.user_name) {
      res.status(401).send({
        msg: "Username already exists. Please use another username.",
      });
    }
  }
  if (err.status === 401) {
    res.status(401).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "something went wrong." });
  }
};
