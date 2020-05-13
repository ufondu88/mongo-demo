const mongoose = require('mongoose');
const Joi = require('joi');
const User = require('./user');

// const uri = "mongodb+srv://uzoufondu:&123Canon@mycluster-se2sm.mongodb.net/test?retryWrites=true&w=majority";

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => console.log('connected to MongoDB database'))
//         .catch(err => console.error('could not connect to MongoDB', err))

const Post = mongoose.model('Posts', new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
        required: true 
    },
    likes: [String],
    comments: [String],
    content: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
}));

function validatePost(post) {
    const schema = {
        author: Joi.string().required(),
        likes: Joi.array().items(Joi.string()),
        comments: Joi.array().items(Joi.string()),
        content: Joi.string().required(),
        
    }
    return Joi.validate(post, schema);
}

// async function createPost(){
//     const post = new Post({
//         author: "5ebb2ea9163d3972c35ebf75",
//         content: "Wooo! MEAN!!",
//     })

//     const result = await post.save();
//     console.log(result);
    
// }

// createPost();
 
exports.Post = Post;
exports.validate = validatePost