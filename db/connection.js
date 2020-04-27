const mongoose = require("mongoose");

const uri =
  "mongodb+srv://peekaboo:QJx9g8LlYp@peekaboo-hryue.mongodb.net/peekaboo?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
