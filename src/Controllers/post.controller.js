// controllers/postController.js
const { runQuery } = require('../config/database.config');

const getAllPosts = async () => {
  const query = 'SELECT * FROM posts';
  const posts = await runQuery(query);
  return posts;
};

const getPostsByUser = async (userId) => {
  const query = 'SELECT * FROM posts WHERE user_id = $1';
  const params = [userId];
  const posts = await runQuery(query, params);
  return posts;
};

const createPost = async (body) => {
  const { title, text, user_id } = body;
  const query =
    'INSERT INTO posts (title, text, user_id) VALUES ($1, $2, $3) RETURNING *';
  const params = [title, text, user_id];
  const response = await runQuery(query, params);
  return response[0];
};

const editPost = async (postId, body) => {
  const { title, text } = body;
  const query =
    'UPDATE posts SET title = $1, text = $2 WHERE id = $3 RETURNING *';
  const params = [title, text, postId];
  const response = await runQuery(query, params);
  return response[0];
};

const deletePost = async (postId) => {
  const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
  const params = [postId];
  const response = await runQuery(query, params);
  return response[0];
};

module.exports = {
  getAllPosts,
  getPostsByUser,
  createPost,
  editPost,
  deletePost,
};
