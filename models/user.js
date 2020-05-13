const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

userSchema = new mongoose.Schema({
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
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('Users', userSchema);

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