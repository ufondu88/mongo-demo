const { Comment, validate } = require('../models/comment');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

//get all comments
router.get('/', async (req, res) => {
  const comments = await Comment.find()
    .populate('author', '-password')
    .populate('likes', '-password')
    .populate('dislikes', '-password')
  res.json(comments);
});

//get comments by specific author
router.get('/author', async (req, res) => {
  const comment = await Comment.find({ author: req.query.author })
    .sort({ date: -1 })
    .populate('author', '-password')
    .populate('likes', '-password')
    .populate('dislikes', '-password')

  if (!comment) return res.status(404).json('The comment with the given ID was not found.');

  res.json(comment);
});

//get comments by followed authors
router.get('/followed', async (req, res) => {
  const comments = await Comment.find({ author: { $in: req.query.following } })
    .sort({ date: -1 })
    .populate('author', '-password')
    .populate('likes', '-password')
    .populate('dislikes', '-password')

  if (!comments) return res.status(404).json('The comment with the given ID was not found.');

  res.json(comments);
});

//get all favorite comments
router.get('/favorites', async (req, res) => {
  const comments = await Comment.find({ _id: { $in: req.query.favorites } })
    .sort({ date: -1 })
    .populate('author', '-password')
    .populate('likes', '-password')
    .populate('dislikes', '-password')

  if (!comments) return res.status(404).json('The comment with the given ID was not found.');

  res.json(comments);
});

//get comments by ID
router.get('/:id', async (req, res) => {
  const comment = await Comment.find({ _id: req.params.id })
    .sort({ date: -1 })
    .populate('author', '-password')
    .populate('likes', '-password')
    .populate('dislikes', '-password')

  if (!comment) return res.status(404).json('The comment with the given ID was not found.');

  res.json(comment);
});

//create comment
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let comment = new Comment(req.body);
  comment = await comment.save();

  res.json(comment);
});

//update comment
router.put('/:id', async (req, res) => {
  if (req.body.author._id) req.body.author = req.body.author._id
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!comment) return res.status(404).json('The comment with the given ID was not found.');

  res.json(req.body);
});

//delete comment
router.delete('/:id', async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id);

  if (!comment) return res.status(404).json('The comment with the given ID was not found.');

  res.json(comment);
});

module.exports = router; 
