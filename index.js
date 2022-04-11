const { PORT = 3000 } = process.env
const express = require('express');
const server = express();
const apiRouter = require('./api');
const morgan = require('morgan');
const { client } = require('./db');
require('dotenv').config();

client.connect();

server.use(morgan('dev'));
server.use(express.json());
server.use('/api', apiRouter);

server.use((req, res, next) => {
    console.log("---Body Logger START---");
    console.log(req.body);
    console.log("---Body Logger End---");

    next();
})

server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});



server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});