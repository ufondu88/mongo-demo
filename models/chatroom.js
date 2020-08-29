const mongoose = require("mongoose");
const Joi = require("joi");

chatroomSchema = new mongoose.Schema({
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  ],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
  date: { type: Date, default: Date.now, required: true },
});

const Chatroom = mongoose.model("Chatrooms", chatroomSchema);

function validateChatroom(chatroom) {
  const schema = {
    members: Joi.array().items(Joi.string()).required(),
  };
  return Joi.validate(chatroom, schema, { allowUnknown: true });
}

exports.Chatroom = Chatroom;
exports.validate = validateChatroom;
