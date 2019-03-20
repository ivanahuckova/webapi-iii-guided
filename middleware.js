function sillyMiddleware(req, res, next) {
  //anything to req, res

  next();
}

function addTeam(req, res, next) {
  req.team = 'EU1';
  next();
}

function logger(req, res, next) {
  console.log('REQ.PROTOCOL: ', req.protocol);
  console.log('REQ.HOST: ', req.hostname);
  console.log('REQ.METHOD: ', req.method);
  console.log('REQ.PARAMS: ', req.params);
  console.log('REQ.QUERY: ', req.query);
  console.log('REQ.BODY: ', req.body);
  console.log('REQ.HEADERS: ', req.headers);
  console.log('REQ.ORIGINAL_URL: ', req.originalUrl);
  next();
}

function auth(req, res, next) {
  if (req.headers.auth === 'eu1') {
    next();
  } else {
    res.status(404).json({ error: 'You need to be authorized' });
  }
}

module.exports = {
  sillyMiddleware,
  addTeam,
  logger,
  auth
};
