module.exports = (req, res, next) => {
  req.bible = 'it works';
  next();
};
