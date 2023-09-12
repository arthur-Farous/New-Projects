const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); 

// Define your user routes here using userController functions
router.get('/', userController.loginUser);
router.post('/', userController.createUser);
// ...other routes...

module.exports = router;
