const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors')
const app = express();
const config = require('config');
const http = require('http').createServer();
const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//     socket.emit('welcome', 'Connected to socket')
// })

io.of('/messages').on('connection', (socket) => {
    socket.emit('welcome', 'Hello and welcome to the chat area')
})

const posts = require('./routes/posts');
const users = require('./routes/users');
const chatrooms = require('./routes/chatrooms');
const messages = require('./routes/messages');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey not defined');
    process.exit(1);
}

app.use(cors()) // Use this after the variable declaration
app.use(express.json());
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/chatrooms', chatrooms);
app.use('/api/messages', messages);
app.use('/api/auth', auth);

const uri = "mongodb+srv://uzoufondu:&123Canon@mycluster-se2sm.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to MongoDB database'))
    .catch(err => console.error('could not connect to MongoDB', err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
http.listen(4000, () => console.log(`ssocket listening on port 4000...`))

