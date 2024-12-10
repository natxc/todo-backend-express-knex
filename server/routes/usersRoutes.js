const express = require('express');
const usersController = require('../controllers/usersController.js');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);

router.post('/', usersController.postUser);
router.patch('/:id', usersController.patchUser);

router.delete('/', usersController.deleteAllUsers);
router.delete('/:id', usersController.deleteUser);


module.exports = router;