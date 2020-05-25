const { Message, validate } = require('../models/message');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

//get all messages
router.get('/', async (req, res) => {
  const messages = await Message.find()
        .sort('date')
        .populate('members', 'username _id')
        .populate('messages', 'sender message message')
  res.json(messages);
});

//get messages by specific user
router.get('/:user', auth,  async (req, res) => {
  const messages = await Message.find({ members: req.params.user }).sort({ date: -1 });

  res.json(messages);
});

//create message
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let message = new Message(req.body);
  message = await message.save();

  res.json(message);
});

//update message
router.put('/:id', async (req, res) => {
  req.body.author = req.body.author._id
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const message = await Message.findByIdAndUpdate(req.params.id,
    req.body, { new: true });

  if (!message) return res.status(404).send('The message with the given ID was not found.');

  res.send(req.body);
});

//delete message
router.delete('/:id', async (req, res) => {
  const message = await Message.findByIdAndRemove(req.params.id);

  if (!message) return res.status(404).send('The message with the given ID was not found.');

  res.send(message);
});

module.exports = router; 
