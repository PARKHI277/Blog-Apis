const Post = require("../model/Post");
const User = require("../models/post");
const asyncHandler = require("express-async-handler");



exports.createPost = asyncHandler(async (req, res) => {

  req.body.userId = req.user._id;
  const post = await Post.create(req.body);

  // Associate user to post
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { posts: post._id },
    },
    { new: true }
  );

  res.status(201).send({ data: post });
});


exports.updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
     res.status(400).send({ msg: "Error!"});
  }

 
  if (post.userId.toString() !== req.user._id.toString()) {
    res.status(400).send({ msg: "Error!" });
  }

  const doc = await Post.findOneAndUpdate(post._id, req.body, { new: true });

  res.status(200).json({ data: doc });
});


exports.allPosts = asyncHandler(async (req, res) => {
  const post = await Post.find().populate("userId");

  const posts = post.filter((item) => {
    return !item.userId.blocked.includes(req.user._id);
  });

  res.status(200).json({ size: posts.length, data: posts });
});


exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("userId");

    if (!post) {
        res.status(400).send({ msg: "Error!" });
    }

  res.send(post);
});


exports.deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
 res.status(400).send({ msg: "Error!" });
  }

  // Check if The Post Belong To User
  if (post.userId.toString() !== req.user._id.toString()) {
    res.status(400).send({ msg: "Error!" });
  }

  await Post.findByIdAndDelete(id);

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { posts: post._id },
    },
    { new: true }
  );

  res.status(204).send();
});
