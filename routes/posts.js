const {Post, validate} = require('../models/post'); 
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find().sort('name');
  res.send(posts);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).send('The post with the given ID was not found.');

  res.send(post);
});

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

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id,
    { 
      author: req.body.author,
      content: req.body.content,
      date: req.body.date
    }, { new: true });

  if (!post) return res.status(404).send('The post with the given ID was not found.');
  
  res.send(post);
});

router.delete('/:id', async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  if (!post) return res.status(404).send('The post with the given ID was not found.');

  res.send(post);
});

module.exports = router; 