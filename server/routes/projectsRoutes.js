const express = require('express');
const projectsController = require('../controllers/projectsController.js');

const router = express.Router();

router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProject);

router.post('/', projectsController.postProject);
router.patch('/:id', projectsController.patchProject);

router.delete('/', projectsController.deleteAllProjects);
router.delete('/:id', projectsController.deleteProject);


module.exports = router;