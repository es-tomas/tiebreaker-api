const Tournament = require('../models/tournamentModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.aliasTopTournaments = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTournaments = catchAsync(async (req, res) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Tournament.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tournaments = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: tournaments.length,
    data: {
      tournaments,
    },
  });
});

exports.getTournament = catchAsync(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  res.status(200).json({
    status: 'success',
    data: {
      tournament,
    },
  });
});

exports.createTournament = catchAsync(async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()

  const newTournament = await Tournament.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTournament,
    },
  });
});

exports.updateTournament = catchAsync(async (req, res) => {
  const tournament = await Tournament.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      tournament,
    },
  });
});

exports.deleteTournament = catchAsync(async (req, res) => {
  await Tournament.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
