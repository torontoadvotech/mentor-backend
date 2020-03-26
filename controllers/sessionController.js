const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');

const Session = require('../models/sessionModel');
const User = require('../models/userModel');

exports.setMentorMenteeIds = (req, res, next) => {
  if (!req.body.mentor) req.body.mentor = req.params.mentorId;
  if (!req.body.mentee) req.body.mentee = req.user.id;

  next();
};

exports.requestSession = catchAsync(async (req, res, next) => {
  const session = await Session.create(req.body);
  const mentor = await User.findById(req.body.mentor);

  const message = `You have received a new request for mentorship from ${req.user.name}! To view this request log into your account at www.torontoadvotech.com/login`;

  try {
    await sendEmail({
      email: mentor.email,
      subject: 'New mentorship request!',
      message
    });

    res.status(200).json({
      status: 'success',
      data: {
        session
      }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.acceptSession = catchAsync(async (req, res, next) => {
  const session = await Session.findOne({
    _id: req.params.sessionId,
    confirmed: false
  });

  const mentee = await User.findById(session.mentee);

  if (!session) {
    return next('No unconfirmed session matches id provided', 404);
  }

  session.confirmed = true;

  const message = `Your mentorship request with ${req.user.name} has been accepted! To review this session log into your account at www.torontoadvotech.com/login`;

  try {
    await session.save();
    await sendEmail({
      email: mentee.email,
      subject: 'Your mentorship request has been approved!',
      message
    });

    res.status('200').json({
      status: 'success',
      session
    });
  } catch (error) {
    console.log(error);
  }
});
