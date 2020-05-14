const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate, addInitialFollower } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const users = await User.find().sort('username');
    res.send(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    //if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(req);
});

//register new user to the datanase
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    //hash the user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = user.generateAuthToken();
    addInitialFollower(user._id);

    res.header('x-auth-token', token).send(_.pick(user, ['username', 'email', 'firstName', 'lastName']));
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id,
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }, { new: true });

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
});

module.exports = router; 