const express = require('express');
const tournamentController = require('../controllers/tournamentController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(
    tournamentController.aliasTopTournaments,
    tournamentController.getAllTournaments
  );

router
  .route('/')
  .get(authController.protect, tournamentController.getAllTournaments)
  .post(tournamentController.createTournament);

router
  .route('/:id')
  .get(tournamentController.getTournament)
  .patch(tournamentController.updateTournament)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tournamentController.deleteTournament
  );

module.exports = router;
