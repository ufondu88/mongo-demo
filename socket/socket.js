const { Chatroom } = require('../models/chatroom');
const { Post } = require('../models/post');
const http = require('http').createServer();
const io = require('../node_modules/socket.io')(http);

let rooms = []
let posts = []

http.listen(4000, () => console.log(`socket listening on port 4000...`))

function start(){
    getChatrooms()
    getPosts()

    openSocket()
}

async function getChatrooms() {
    return await Chatroom.find().then(res => {
        res.forEach(chatroom => rooms.push(JSON.stringify(chatroom._id)));
    })
}

async function getPosts() {
    return await Post.find().then(res => {
        res.forEach(post => posts.push(JSON.stringify(post._id)));
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

exports.io = io;
exports.http = http;
