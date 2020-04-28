const express = require("express");
const app = express();
require("dotenv").config();
require("./db/connection");

const { apiRouter } = require("./routers/api-router");
const { handleErrors } = require("./errors/errors");

app.use(express.json());
app.use("/api", apiRouter);
app.use(handleErrors);

module.exports = { app };
