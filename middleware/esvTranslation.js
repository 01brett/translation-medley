module.exports = (req, res, next) => {
  req.bible = 'it worksssss';
  next();
};
