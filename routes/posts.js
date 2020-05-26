const { Post, validate } = require('../models/post');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

//get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find()
        .sort('name')
        .populate('author', 'username _id')
        .populate('repost', 'author content date')
        .populate('comments.author', 'username _id');
  res.json(posts);
});

//get posts by specific author
router.get('/author', async (req, res) => {
  const post = await Post.find({ author: req.query.author }).sort({ date: -1 });

  if (!post) return res.status(404).send('The post with the given ID was not found.');

  res.send(post);
});

//create post
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Post(req.body);
  post = await post.save();

  res.json(post);
});

//update post
router.put('/:id', async (req, res) => {
  req.body.author = req.body.author._id
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id,
    req.body, { new: true });

  if (!post) return res.status(404).send('The post with the given ID was not found.');

  res.send(req.body);
});

//delete post
router.delete('/:id', async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  if (!post) return res.status(404).send('The post with the given ID was not found.');

  res.send(post);
});

module.exports = router; 
