const mongoose = require("mongoose");
const { dbURL } = require('../variables');

module.exports = function () {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`connected to MongoDB database`)
    })
    .catch(err => console.error("could not connect to MongoDB", err));
};

