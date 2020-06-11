const http = require("http").createServer();
const io = require("socket.io")(http);

http.listen(4000, () => console.log(`socket listening on port 4000...`));

exports.io = io;
exports.http = http;
