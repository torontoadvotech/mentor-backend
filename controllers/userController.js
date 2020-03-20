const User = require('../models/userModel');
const handlerFactory = require('./handlerFactory');

exports.getAllUsers = handlerFactory.getAll(User);
