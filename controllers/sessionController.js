const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/catchAsync');

const Session = require('../models/sessionModel');

exports.setMentorMenteeIds = (req, res, next) => {
  if (!req.body.mentor) req.body.mentor = req.params.mentorId;
  if (!req.body.mentee) req.body.mentee = req.user.id;

  next();
};

exports.requestSession = catchAsync(async (req, res, next) => {
  const session = await Session.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      session
    }
  });
});
