const express = require("express");
const router = express.Router();
const multer = require("multer");
const Blog = require("../models/blog");

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Blog
router.post("/post", upload.single("image"), async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Get All Blogs
router.get("/get", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Get Blog Image
router.get("/image/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.set("Content-Type", blog.image.contentType);
    res.send(blog.image.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load image" });
  }
});

// Update Blog
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      content: req.body.content,
    };

    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// Delete Blog
router.delete("/delete/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
