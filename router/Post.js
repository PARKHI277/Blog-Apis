const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  allPosts,
  getPost,
  deletePost,
} = require("../controllers/post");



const {
  createPostValidator,
  removePostValidator,
  updatePostValidator,
  getPostValidator,
} = require("../utils/validators/postValidator");


router.post(
  "/post",
  alowedTo("admin", "user"),
  createPostValidator,
  createPost
);

// @desc Update Post
// @access Protect
router.put(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  updatePostValidator,
  updatePost
);

// @desc get all Post
// @access Protect
router.get("/", requireSignIn, alowedTo("admin", "user"), allPosts);

// @desc get a single Post
// @access Protect
router.get(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  getPostValidator,
  getPost
);

// @desc Delete a Post
// @access Protect
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  removePostValidator,
  deletePost
);

module.exports = router;
