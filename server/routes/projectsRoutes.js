const express = require('express');
const projectsController = require('../controllers/projectsController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get('/', projectsController.getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Retrieve a single project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: Numeric ID of the project to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 */
router.get('/:id', projectsController.getProject);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', projectsController.postProject);

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: Numeric ID of the project to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 */
router.patch('/:id', projectsController.patchProject);

/**
 * @swagger
 * /projects:
 *   delete:
 *     summary: Delete all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: All projects deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/', projectsController.deleteAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: Numeric ID of the project to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete('/:id', projectsController.deleteProject);

module.exports = router;
