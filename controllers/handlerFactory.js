const catchAsync = require('../utils/catchAsync');

exports.getAll = Model => {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
      status: 'success',
      results: docs.length,
      docs
    });
  });
};
