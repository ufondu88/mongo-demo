const { Chatroom } = require('../models/chatroom');
const http = require('http').createServer();
const io = require('../node_modules/socket.io')(http);

async function chatrooms(){
    return await Chatroom.find().then(res => console.log(res))
}

chatrooms()
const rooms = ['red', 'blue', 'yellow']
io.of('/messages')
    .on('connection', (socket) => {
        socket.emit('welcome', 'Hello and welcome to the chat area')

        socket.on('joinRoom', (room) => {
            if (rooms.includes(room)){
                socket.join(room)
                return socket.emit('success', `You have suiccessfully joined the ${room} room`)
            } else {
                return socket.emit('error', `${room} does not exist`)
            }
        })
    })

http.listen(4000, () => console.log(`socket listening on port 4000...`))

exports.io = io;
exports.http = http;
