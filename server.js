const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');
const md = require('./middleware');
const err = require('./error');

const sillyMiddleware = md.sillyMiddleware;
const addTeam = md.addTeam;
const logger = md.logger;
const auth = md.auth;
const myError = err.myError;

const server = express();

server.use(express.json());
server.use(helmet());
server.use(sillyMiddleware);
server.use(addTeam);
server.use(logger);
server.use(auth('eu1'));

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res, next) => {
  // throw new Error('all kind of nastyness');
  if (req.headers.foo) {
    res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to ${req.team} the Lambda Hubs API</p>
    `);
  } else {
    next({ message: 'You got no foo' });
  }
});

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>BOOO YOU DONT HAVE FOOO</p>
    `);
});

server.use(myError); //the closest one will eat error => next = error throwing
//more stuff
// server.use(myError2);
// //more endpoints
// server.use(myError3);

module.exports = server;
