const mongoose = require("mongoose");
const Joi = require("joi");

postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  content: { type: String, required: true },
  repost: { type: mongoose.Schema.Types.ObjectId, ref: "Posts", default: null },
  date: { type: Date, default: Date.now, required: true },
  repostedBy: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      date: { type: Date, default: Date.now, required: true },
    },
  ],
});

const Post = mongoose.model("Posts", postSchema);

function validatePost(post) {
  const schema = {
    author: Joi.string().required(),
    content: Joi.string().required(),
  };
  return Joi.validate(post, schema, { allowUnknown: true });
}

async function createPost() {
  const post = new Post({
    author: "5ebb2ea9163d3972c35ebf75",
    content: "Wooo! MEAN!!",
  });

  const result = await post.save();
}

async function updatePost() {
  Post.update(
    {},
    {
      repostedBy: [],
    },
    { multi: true },
    (err, raw) => {
      if (err) console.log(err);
      console.log("The raw response from Mongo was ", raw);
    }
  );
}

async function getComments() {
  comments = await Post.find({ comments: { $not: { $size: 0 } } })
    .select("comments")
    .then((comments) => {
      for (let post of comments) {
        for (let comment of post.comments) {
          //addComment(comment)
        }
      }
    });
}

//getComments();

exports.Post = Post;
exports.validate = validatePost;
