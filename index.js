const mongoose = require('mongoose');
const posts = require('./routes/posts');
const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors()) // Use this after the variable declaration
app.use(express.json());
app.use('/api/posts', posts);

const uri = "mongodb+srv://uzoufondu:&123Canon@mycluster-se2sm.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connected to MongoDB database'))
        .catch(err => console.error('could not connect to MongoDB', err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));