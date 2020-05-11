const mongoose = require('mongoose')

const uri = "mongodb+srv://uzoufondu:&123Canon@mycluster-se2sm.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connected to MongoDB database'))
        .catch(err => console.error('could not connect to MongoDB', err))

const postSchema = new mongoose.Schema({
    author: String,
    likes: [ String ],
    comments: [ String ],
    content: String,
    date: {type: Date, default: Date.now},
})

const Post = mongoose.model('Posts', postSchema);

async function createPost(){
    const post = new Post({
        author: 'Danger Mouse',
        likes: [ 'Uzo Ufondu' ],
        comments: [ 'First Comment' ],
        content: 'This is the second post of this project'
    })

    const result = post.save();
    console.log(result);
}

exports.getPosts = async () => {
    return await Post.find();
}

exports.getPostsByID = async (id) => {
    try {
        return await Post.findById(id)
    } catch (error) {
        console.log(error.message);
    }
}

createPost()