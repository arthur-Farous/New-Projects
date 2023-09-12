const express = require('express');
const api = express.Router(); 
const userRoutes = require('../../routes/user'); 
const postRoutes = require('../../routes/post');

// Mount routes under the /api prefix
api.use('/user', userRoutes);
api.use('/post',postRoutes);

module.exports = api;
