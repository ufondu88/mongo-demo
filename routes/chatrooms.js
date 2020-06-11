const { Chatroom, validate } = require("../models/chatroom");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

//get all chatrooms
router.get("/", async (req, res) => {
  const chatrooms = await Chatroom.find()
    .sort("date")
    .populate("members", "-password")
    .populate("messages", "sender chatroom message date");
  res.json(chatrooms);
});

//get chatrooms by user
router.get("/user", auth, async (req, res) => {
  const chatrooms = await Chatroom.find({ members: req.query.userID })
    .populate("members", "-password")
    .populate("messages", "sender chatroom message date");

  res.json(chatrooms);
});

//get specific chatroom by id
router.get("/:id", auth, async (req, res) => {
  const chatroom = await Chatroom.find({ _id: req.params.id }).sort({
    date: -1,
  });

  res.json(chatroom);
});

//get private chatroom
router.get("/:user/:otherUser", auth, async (req, res) => {
  //find the chatroom that contains just two members and the members are the user and otherUser
  const chatroom = await Chatroom.find({
    members: { $size: 2 },
    members: { $all: [req.params.user, req.params.otherUser] },
  });

  res.json(chatroom);
});

//create chatroom
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let chatroom = new Chatroom(req.body);
  chatroom = await chatroom.save();

  res.json(chatroom);
});

//update chatroom
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const chatroom = await Chatroom.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!chatroom)
    return res
      .status(404)
      .send("The chatroom with the given ID was not found.");

  res.json(req.body);
});

//delete chatroom
router.delete("/:id", async (req, res) => {
  const chatroom = await Chatroom.findByIdAndRemove(req.params.id);

  if (!chatroom)
    return res
      .status(404)
      .send("The chatroom with the given ID was not found.");

  res.send(chatroom);
});

module.exports = router;
