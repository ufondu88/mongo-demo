const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  firstName: { type: String, required: true, minlength: 3, maxlength: 255 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 255 },
  description: { type: String, maxlength: 100 },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
  chatrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chatrooms" }],
  profilePicture: { type: String, required: true, default: "default.jpeg" },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).email().required(),
    password: Joi.string().min(3).max(255).required(),
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
  };
  return Joi.validate(user, schema, { allowUnknown: true });
}

async function updateUser() {
  User.updateMany(
    { profilePicture: "default.jpeg" },
    {
      profilePicture: `${User.username[0]}.png`,
    },
    { multi: true },
    (err, raw) => {
      if (err) return handleError(err);
      console.log("The raw response from Mongo was ", raw);
    }
  );
}

async function addInitialFollower(id) {
  User.updateMany(
    { _id: id },
    {
      following: ["5ebb2ea9163d3972c35ebf75"],
    },
    { multi: true },
    (err, raw) => {
      if (err) return handleError(err);
      console.log("The raw response from Mongo was ", raw);
    }
  );
}

async function updatePrimeFollowers(id) {
  User.update(
    { _id: "5ebb2ea9163d3972c35ebf75" },
    {
      $push: { followers: id },
    },
    (err, raw) => {
      if (err) return handleError(err);
      console.log("The raw response from Mongo was ", raw);
    }
  );
}

async function getNonFollowers() {
  primeID = "5ebb2ea9163d3972c35ebf75";
  primeFollowers = await User.findById(primeID).select("followers");
  users = await User.find().select("_id");

  users.forEach((user) => {
    if (!primeFollowers.followers.includes(user._id) && user._id != primeID)
      updatePrimeFollowers(user._id);
  });
}

//updateUser()

exports.User = User;
exports.validate = validateUser;
exports.addInitialFollower = addInitialFollower;
exports.updatePrimeFollowers = updatePrimeFollowers;
