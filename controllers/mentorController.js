const User = require('../models/userModel');
const handlerFactory = require('./handlerFactory');

exports.getAllMentors = handlerFactory.getAll(User);
