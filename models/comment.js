const mongoose = require('mongoose');
const Joi = require('joi');

commentSchema =  new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    comment: { type: String, minlength: 1 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    date: { type: Date, default: Date.now, required: true },
})

const Comment = mongoose.model('Comments', commentSchema);

function validateComment(comment) {
    const schema = {
        author: Joi.string().required(),
        comment: Joi.string().required()
    }
    return Joi.validate(comment, schema, { allowUnknown: true });
}

exports.Comment = Comment;
exports.validate = validateComment;
