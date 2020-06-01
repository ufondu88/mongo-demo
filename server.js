const express = require('express');
const app = express();

//sockets
require('./socket/chatroom.js');
require('./socket/profile.js');

//startup files
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
