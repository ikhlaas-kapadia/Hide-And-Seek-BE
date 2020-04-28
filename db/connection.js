const mongoose = require("mongoose");

let dbUrl;
if(process.env.NODE_ENV === "test") dbUrl = process.env.DB_CONNECTION_TEST
else if(process.env.NODE_ENV === "dev") dbUrl = process.env.DB_CONNECTION_DEV
else if(process.env.NODE_ENV === "prod") dbUrl = process.env.DB_CONNECTION_PROD

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
