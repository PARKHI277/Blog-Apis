
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
        title:
        {
            type: String,
            required: [true, "title is required"],
            trim: true,
        },
        description:
        {
            type: String,
            required: [true, "post description is required"],
            trim: true,
        },
        userId:
        {
            type: String,
            required:[true,"userId is required"]
        }
  },
  {
    timestamps: true,
  }
);

// Create Model
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
