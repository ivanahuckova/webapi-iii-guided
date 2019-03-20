function myError(err, req, res, next) {
  //add stuff to req, res, nect when error happens
  //res.send something right away
  res.json({
    error: 'Something bad happened',
    message: err.message
  });
  // res.send(next());
}

module.exports = {
  myError
};
