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
        username: Joi.string().required().minlength(3).maxlength(255),
        email: Joi.string().required().minlength(3).maxlength(255).email(),
        password: Joi.string().required().minlength(3).maxlength(255),
        firstName: Joi.string().required().minlength(3).maxlength(255),
        lastname: Joi.string().required().minlength(3).maxlength(255)
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser