const express = require('express');
const menteeController = require('../controllers/menteeController');

const router = express.Router();

router.route('/').get(menteeController.getAllMentees);

module.exports = router;
