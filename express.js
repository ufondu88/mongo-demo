
const express = require('express');
const db = require('./mongo')
var cors = require('cors')

const app = express();

app.use(cors()) // Use this after the variable declaration
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/api/posts', (req, res) => {
    db.getPosts().then(posts => res.send(posts))
});

app.get('/api/posts/:id', (req, res) => {
    db.getPostsByID(req.params.id)
        .then(post => res.send(post))
        .catch(err => console.log(err.message))
});

app.post('/api/courses', (req, res) => {
    const course = 
    {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/course/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) res.status(404).send('Course not found!');
    res.send(course)
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`))