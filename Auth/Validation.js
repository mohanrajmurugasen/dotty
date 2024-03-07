const Validation = (req, res, next) => {
  const token = req.header("Authorization");
  req.token = token;
  next();
};

module.exports = Validation;
