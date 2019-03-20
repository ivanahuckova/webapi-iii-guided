const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');
const md = require('./middleware');

const sillyMiddleware = md.sillyMiddleware;
const addTeam = md.addTeam;
const logger = md.logger;
const auth = md.auth;

const server = express();

server.use(express.json());
server.use(helmet());
server.use(sillyMiddleware);
server.use(addTeam);
server.use(logger);
server.use(auth);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to ${req.team} the Lambda Hubs API</p>
    `);
});

module.exports = server;
