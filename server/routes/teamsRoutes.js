const express = require('express');
const teamsController = require('../controllers/teamsController.js');
const { authenticateToken } = require('../middlewares/authMiddleware.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API endpoints for managing teams
 */

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retrieve all teams for the authenticated user
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/', authenticateToken, teamsController.getAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Retrieve a single team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the team to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */
router.get('/:id', authenticateToken, teamsController.getTeam);

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', authenticateToken, teamsController.postTeam);

/**
 * @swagger
 * /teams/{id}:
 *   patch:
 *     summary: Update an existing team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the team to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Team not found
 */
router.patch('/:id', authenticateToken, teamsController.patchTeam);

/**
 * @swagger
 * /teams:
 *   delete:
 *     summary: Delete all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: All teams deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/', authenticateToken, teamsController.deleteAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the team to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 */
router.delete('/:id', authenticateToken, teamsController.deleteTeam);

module.exports = router;
