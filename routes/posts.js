const { Post, validate } = require("../models/post");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

//get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find()
    .sort("name")
    .populate("author", "-password")
    .populate("repost", "author content date")
    .populate("comments")
    .populate("likes", "-password")
    .populate("dislikes", "-password")
    .populate("repostedBy");
  res.json(posts);
});

//get posts by specific author
router.get("/author", async (req, res) => {
  const post = await Post.find({ author: req.query.author })
    .sort({ date: -1 })
    .populate("author", "-password")
    .populate("repost", "author content date")
    .populate("comments")
    .populate("likes", "-password")
    .populate("dislikes", "-password")
    .populate("repostedBy");

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
});

//get posts by followed authors
router.get("/followed", async (req, res) => {
  const posts = await Post.find({ author: { $in: req.query.following } })
    .sort({ date: -1 })
    .populate("author", "-password")
    .populate("repost", "author content date")
    .populate("comments")
    .populate("likes", "-password")
    .populate("dislikes", "-password")
    .populate("repostedBy");

  if (!posts)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(posts);
});

//get all favorite posts
router.get("/favorites", async (req, res) => {
  const posts = await Post.find({ _id: { $in: req.query.favorites } })
    .sort({ date: -1 })
    .populate("author", "-password")
    .populate("repost", "author content date")
    .populate("comments")
    .populate("likes", "-password")
    .populate("dislikes", "-password")
    .populate("repostedBy");

  if (!posts)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(posts);
});

//get posts by ID
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)
    .sort({ date: -1 })
    .populate("author", "-password")
    .populate("repost", "author content date")
    .populate("comments")
    .populate("likes", "-password")
    .populate("dislikes", "-password")
    .populate("repostedBy");

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
});

//create post
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let post = new Post(req.body);
  post = await post.save();

  res.json(post);
});

//update post
router.put("/:id", async (req, res) => {
  if (req.body.author._id) req.body.author = req.body.author._id;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(req.body);
});

//delete post
router.delete("/:id", async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
});

module.exports = router;
