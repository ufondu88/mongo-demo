const mongoose = require("mongoose");
require('dotenv').config();

module.exports = function () {
  const uri =
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@mycluster-se2sm.mongodb.net/test?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to MongoDB database"))
    .catch((err) => console.error("could not connect to MongoDB", err));
};
