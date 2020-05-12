const mongoose = require('mongoose');
const Joi = require('joi');

const Post = mongoose.model('Posts', new mongoose.Schema({
    author: { type: String, required: true },
    likes: [ String ],
    comments: [ String ],
    content: { type: String, required: true },
    date: {type: Date, default: Date.now, required: true },
}));

function validatePost(post){
    const schema = {
        author: Joi.string().required(),
        likes: Joi.array().items(Joi.string()),
        comments: Joi.array().items(Joi.string()),
        content: Joi.string().required(),
        date: Joi.date().required()
    }
    return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost