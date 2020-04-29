const mongoose = require("mongoose");
const connectionSettings = require("./connectionSettings.js")

const dbUrl = connectionSettings();

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

module.exports = { dbUrl };
