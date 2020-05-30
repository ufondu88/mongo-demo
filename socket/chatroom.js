const { Chatroom } = require('../models/chatroom');
const { io } = require('./socket.js');

let rooms = []

function start(){
    getChatrooms()

    openSocket()
}

async function getChatrooms() {
    return await Chatroom.find().then(res => {
        res.forEach(chatroom => rooms.push(JSON.stringify(chatroom._id)));
    })
}

function openSocket(){
    openChatroomConnection()
}

function openChatroomConnection(){
    io
    .of('/messages')
    .on('connection', (socket) => {
        socket.on('joinRoom', (data) => {
            if (rooms.includes(JSON.stringify(data.message.chatroom))) {
                socket.emit('newMessage', data)
            } else {
                return socket.emit('error', `${data.message.chatroom} does not exist`)
            }
        })
    })
}

function openProfileConnection(){
    io
    .of('/profiles')
    .on('connection', (socket) => {
        socket.on('joinRoom', (data) => {
            if (rooms.includes(JSON.stringify(data.message.chatroom))) {
                socket.emit('newMessage', data)
            } else {
                return socket.emit('error', `${data.message.chatroom} does not exist`)
            }
        })
    })
}



start()
