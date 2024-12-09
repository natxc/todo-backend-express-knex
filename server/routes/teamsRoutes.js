const express = require('express');
const teamsController = require('../controllers/teamsController.js');

const router = express.Router();

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getTeam);

router.post('/', teamsController.postTeam);
router.patch('/:id', teamsController.patchTeam);

router.delete('/', teamsController.deleteAllTeams);
router.delete('/:id', teamsController.deleteTeam);


module.exports = router;