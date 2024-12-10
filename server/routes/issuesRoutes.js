const express = require('express');
const issuesController = require('../controllers/issuesController.js');

const router = express.Router();

router.get('/', issuesController.getAllIssues);
router.get('/:id', issuesController.getIssue);

router.post('/', issuesController.postIssue);
router.patch('/:id', issuesController.patchIssue);

router.delete('/', issuesController.deleteAllIssues);
router.delete('/:id', issuesController.deleteIssue);

module.exports = router;
