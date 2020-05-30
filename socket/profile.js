const { User } = require('../models/user');
const { io } = require('./socket.js');

let users = []

function start(){
    getUsers()

    openSocket()
}

async function getUsers() {
    return await User.find().then(res => {
        res.forEach(user => users.push(JSON.stringify(user._id)));
    })
}

function openSocket(){
    openPostConnection()
}

function openPostConnection(){
    io
    .of('/posts')
    .on('connection', (socket) => {
        socket.on('joinRoom', (data) => {
            if (users.includes(JSON.stringify(data.post.author._id))) {
                socket.emit('newPost', data)
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
