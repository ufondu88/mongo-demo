const mongoose = require('mongoose');
const Joi = require('joi');

messageSchema =  new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    chatroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatrooms', required: true },
    message: { type: String, minlength: 1, required: true },
    date: { type: Date, default: Date.now, required: true },
})

const Message = mongoose.model('Messages', messageSchema);

function validateMessage(message) {
    const schema = {
        sender: Joi.string().required(),
        chatroom: Joi.string().required(),
        message: Joi.string().minlength(1).required(),
    }
    return Joi.validate(message, schema, { allowUnknown: true });
}

exports.Message = Message;
exports.validate = validateMessage;
