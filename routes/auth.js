const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

//user login
router.post('/', async (req, res) => {
    //validate the incoming data
    const { error } = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    //check if username is valid
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json('Invalid username or password');

    //check if password is valid
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json('Invalid username or password');

    //generate and send JSON web token
    const token = await user.generateAuthToken()
    res.set('x-auth-token', token).json(token);
});

function validate(user) {
    const schema = {
        username: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(3).max(255).required(),
    }
    return Joi.validate(user, schema);
}

module.exports = router; 
