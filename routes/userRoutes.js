const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

// Require login for all routes below here
router.use(authController.protect);

// Require Admin for all routes below here

router.route('/').get(userController.getAllUsers);

module.exports = router;
