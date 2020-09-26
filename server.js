const express = require("express");
const app = express();
const { port } = require('./variables')

//startup files
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
    
app.listen(port, () => console.log(`Listening on port ${port}...`));
