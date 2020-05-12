const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('Users', new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
}));

function validateUser(user){
    const schema = {
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).email().required(),
        password: Joi.string().min(3).max(255).required(),
        firstName: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser