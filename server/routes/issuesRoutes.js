const express = require('express');
const issuesController = require('../controllers/issuesController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Issues
 *   description: API endpoints for managing issues
 */

/**
 * @swagger
 * /issues:
 *   get:
 *     summary: Retrieve all issues
 *     tags: [Issues]
 *     responses:
 *       200:
 *         description: A list of issues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Issue'
 */
router.get('/', issuesController.getAllIssues);

/**
 * @swagger
 * /issues/{id}:
 *   get:
 *     summary: Retrieve a single issue by ID
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: issue_id
 *         required: true
 *         description: Numeric ID of the issue to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single issue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       404:
 *         description: Issue not found
 */
router.get('/:id', issuesController.getIssue);

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create a new issue
 *     tags: [Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Issue'
 *     responses:
 *       201:
 *         description: Issue created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', issuesController.postIssue);

/**
 * @swagger
 * /issues/{id}:
 *   patch:
 *     summary: Update an existing issue
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: issue_id
 *         required: true
 *         description: Numeric ID of the issue to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Issue'
 *     responses:
 *       200:
 *         description: Issue updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Issue not found
 */
router.patch('/:id', issuesController.patchIssue);

/**
 * @swagger
 * /issues:
 *   delete:
 *     summary: Delete all issues
 *     tags: [Issues]
 *     responses:
 *       200:
 *         description: All issues deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/', issuesController.deleteAllIssues);

/**
 * @swagger
 * /issues/{id}:
 *   delete:
 *     summary: Delete an issue by ID
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: issue_id
 *         required: true
 *         description: Numeric ID of the issue to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Issue deleted successfully
 *       404:
 *         description: Issue not found
 */
router.delete('/:id', issuesController.deleteIssue);

module.exports = router;
