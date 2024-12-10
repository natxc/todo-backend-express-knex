const express = require('express');
const usersController = require('../controllers/usersController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/:id', authenticateToken, usersController.getUser);
router.get('/', usersController.getAllUsers);

router.post('/', usersController.postUser);
router.patch('/:id', usersController.patchUser);

router.delete('/', usersController.deleteAllUsers);
router.delete('/:id', usersController.deleteUser);

module.exports = router;