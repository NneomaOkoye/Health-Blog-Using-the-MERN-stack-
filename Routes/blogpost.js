const express = require('express');
const router = express.Router();

// Sample data for blog posts (replace with your data source)
const blogPosts = require('./../blogposts.json')

// Get all blog posts
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: blogPosts });
});

// Get a single blog post by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const blogPost = blogPosts.find((post) => post.id === parseInt(id));

  if (!blogPost) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }

  res.status(200).json({ success: true, data: blogPost });
});

// Create a new blog post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newBlogPost = { id: blogPosts.length + 1, title, content };
  blogPosts.push(newBlogPost);

  res.status(201).json({ success: true, data: newBlogPost });
});

// Delete a blog post by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = blogPosts.findIndex((post) => post.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }

  blogPosts.splice(index, 1);
  res.status(204).json(); // No content
});

// Update a blog post by ID
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const index = blogPosts.findIndex((post) => post.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }

  const updatedBlogPost = { ...blogPosts[index], title, content };
  blogPosts[index] = updatedBlogPost;

  res.status(200).json({ success: true, data: updatedBlogPost });
});

module.exports = router;
