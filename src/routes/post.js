
const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');

// Define post-related routes
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostsByUser);
router.post('/', postController.createPost);
router.put('/:id', postController.editPost);
router.delete('/:id', postController.deletePost);

module.exports = router;
