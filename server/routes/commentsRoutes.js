const express = require('express');
const commentsController = require('../controllers/commentsController.js');

const router = express.Router();

router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getComment);

router.post('/', commentsController.postComment);
router.patch('/:id', commentsController.patchComment);

router.delete('/', commentsController.deleteAllComments);
router.delete('/:id', commentsController.deleteComment);


module.exports = router;