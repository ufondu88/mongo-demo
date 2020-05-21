const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate, addInitialFollower } = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const users = await User.find().sort('username');
    res.json(users);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    res.json(user);
});

router.get('/user', auth, async (req, res) => {
    const user = await User.findOne({ username: req.query.username }).select('-password');
    if (!user) return res.status(400).json('User does not exist');

    res.json(user);
});

//register new user to the datanase
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    user = new User(req.body)

    //hash the user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    const token = user.generateAuthToken();
    addInitialFollower(user._id);

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email', 'firstName', 'lastName']));
    // res.json(token);
});

router.put('/:id', auth, async (req, res) => {

    const user = await User.findByIdAndUpdate(req.body._id,
        req.body, { new: true });

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.json(user);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.send(user);
});

module.exports = router; 