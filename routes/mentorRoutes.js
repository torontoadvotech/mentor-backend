const express = require('express');
const mentorController = require('../controllers/mentorController');

const router = express.Router();

router.route('/').get(mentorController.getAllMentors);

module.exports = router;
