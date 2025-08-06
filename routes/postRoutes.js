const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// CREATE a post
router.post("/post", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post." });
  }
});

// READ all posts
router.get("/get", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// UPDATE a post
router.put("/update/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ error: "Post not found." });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post." });
  }
});

// DELETE a post
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found." });
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post." });
  }
});

module.exports = router;
