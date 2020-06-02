const { User } = require('../models/user');
const { io } = require('./socket.js');

var users = []

function start(){
    getUsers()

}

async function getUsers() { 
    await User.find().select('_id')
    .then(res => {
        users.push(...res)
        openPostConnection()
    })
}

function openPostConnection(){
    io 
    .of('/posts')
    .on('connection', (socket) => {
        socket.on('joinRoom', (data) => {
            if (users.includes(JSON.stringify(data.post.author._id))) {
                console.log(data.post)
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
