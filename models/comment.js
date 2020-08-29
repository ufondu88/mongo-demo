const mongoose = require("mongoose");
const Joi = require("joi");

commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  comment: { type: String, minlength: 1, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  date: { type: Date, default: Date.now, required: true },
});

const Comment = mongoose.model("Comments", commentSchema);

function validateComment(comment) {
  const schema = {
    author: Joi.string().required(),
    comment: Joi.string().required(),
  };
  return Joi.validate(comment, schema, { allowUnknown: true });
}

async function addComment(comment) {
  newObj = {};
  newObj.date = comment.date;
  newObj.likes = comment.likes;
  newObj.dislikes = comment.dislikes;
  newObj.author = comment.author;
  newObj.comment = comment.comment;

  let obj = new Comment(newObj);

  obj.save(function (err, comment) {
    if (err) return console.error(err);
  });
}

exports.Comment = Comment;
exports.validate = validateComment;
exports.addComment = addComment;
