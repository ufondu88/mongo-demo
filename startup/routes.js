var cors = require('cors')
const express = require('express');

module.exports = function (app) {
    const posts = require('../routes/posts');
    const users = require('../routes/users');
    const chatrooms = require('../routes/chatrooms');
    const messages = require('../routes/messages');
    const auth = require('../routes/auth');

    app.use(cors()) // Use this after the variable declaration
    app.use(express.json());
    app.use(express.static('uploads'));
    app.use('/api/users', users);
    app.use('/api/posts', posts);
    app.use('/api/chatrooms', chatrooms);
    app.use('/api/messages', messages);
    app.use('/api/auth', auth);
}