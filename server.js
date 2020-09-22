const express = require("express");
const app = express();
const { port } = require('./variables')

//sockets
require("./socket/chatroom.js");
require("./socket/profile.js");

//startup files
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
    
app.listen(port, () => console.log(`Listening on port ${port}...`));
