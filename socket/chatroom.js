const { Chatroom } = require('../models/chatroom');
const { io } = require('./socket.js');

let rooms = []

function start(){
    getChatrooms()

}

async function getChatrooms() {
    return await Chatroom.find()
    .select('_id')
    .then(res => {
        rooms.push(...res)

        openChatroomConnection()
    });

}

function openChatroomConnection(){
    io
    .of('/messages') 
    .on('connection', (socket) => {
        socket.on('joinRoom', (data) => { 
            if (rooms.filter(res => res._id == data.message.chatroom)) return socket.emit(data.message.chatroom, data)
            return socket.emit('error', `${data.message.chatroom} does not exist`)
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
