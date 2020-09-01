const mongoose = require("mongoose");

module.exports = function () {
  const uri =
    "mongodb+srv://uzoufondu:&123Mongodb@mycluster-se2sm.mongodb.net/test?retryWrites=true&w=majority";

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to MongoDB database"))
    .catch((err) => console.error("could not connect to MongoDB", err));
};
