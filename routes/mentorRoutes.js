const express = require('express');
const mentorController = require('../controllers/mentorController');
const sessionRouter = require('./sessionRoutes');

const router = express.Router();

// Use session router to get sessions from specific mentor
router.use('/:mentorId/sessions', sessionRouter);

router.route('/').get(mentorController.getAllMentors);

module.exports = router;
