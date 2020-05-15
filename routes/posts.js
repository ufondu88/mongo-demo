const { User } = require('../models/user');
const { Post, validate } = require('../models/post');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().sort('name').populate('author', 'username _id');
  res.send(posts);
});

//get specific post by ID
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).send('The post with the given ID was not found.');

  res.send(post);
});

//create post
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Post({
    author: req.body.author,
    content: req.body.content,
    date: req.body.date
  });
  post = await post.save();

  res.send(post);
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