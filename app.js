const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./db/connection");

const { apiRouter } = require("./routers/api-router");
const { handleErrors } = require("./errors/errors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleErrors);

module.exports = { app };
