const express = require("express");
const app = express();
require("./db/connection");
const { apiRouter } = require("./routers/api-router");
app.use(express.json());
app.use("/api", apiRouter);

// app.get("/test", (req, res, next) => {
//   res.send("test");
// });

// app.get("/");

module.exports = { app };
