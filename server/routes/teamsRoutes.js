const express = require('express');
const teamsController = require('../controllers/teamsController.js');

const router = express.Router();

router.get('/', teamsController.getAllTodos);
router.get('/:id', teamsController.getTodo);

router.post('/', teamsController.postTodo);
router.patch('/:id', teamsController.patchTodo);

router.delete('/', teamsController.deleteAllTodos);
router.delete('/:id', teamsController.deleteTodo);

module.exports = router;