// server.js
const express = require('express');
const jsonServer = require('json-server');
const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = 3002;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use('/api', router);

server.listen(PORT, () => {
  console.log(`JSON Server está corriendo en http://localhost:${PORT}`);
});
