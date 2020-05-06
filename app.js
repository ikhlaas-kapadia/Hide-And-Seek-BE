const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const path = require('path');

require('dotenv').config();
require('./db/connection');
require('./sockets/sockets')(io);

const { apiRouter } = require('./routers/api-router');
const { handleErrors } = require('./errors/errors');
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleErrors);

module.exports = { app, http, io };
