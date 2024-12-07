const express = require('express');
const todosController = require('../controllers/todosController.js');

const router = express.Router();

router.get('/', todosController.getAllTodos);
router.get('/:id', todosController.getTodo);

router.post('/', todosController.postTodo);
router.patch('/:id', todosController.patchTodo);

router.delete('/', todosController.deleteAllTodos);
router.delete('/:id', todosController.deleteTodo);

module.exports = router;
