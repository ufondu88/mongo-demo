const { Chatroom } = require('../models/chatroom');
const http = require('http').createServer();
const io = require('../node_modules/socket.io')(http);

let rooms = []
http.listen(4000, () => console.log(`socket listening on port 4000...`))

async function chatrooms() {
    return await Chatroom.find().then(chatrooms => {
        chatrooms.forEach(chatroom => rooms.push(JSON.stringify(chatroom._id)));
        startSocket()
    })
}

function startSocket(){
    io
    .of('/messages')
    .on('connection', (socket) => {
        socket.emit('welcome', 'Hello and welcome to the chat area')

        socket.on('joinRoom', (data) => {
            if (rooms.includes(JSON.stringify(data.message.chatroom))) {
                socket.emit('newMessage', data)
            } else {
                return socket.emit('error', `${data.message.chatroom} does not exist`)
            }
        })
    })
}


chatrooms()

exports.io = io;
exports.http = http;
