const express = require('express');
const commentsController = require('../controllers/commentsController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Retrieve all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get('/', commentsController.getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Retrieve a single comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: Numeric ID of the comment to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
router.get('/:id', commentsController.getComment);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', commentsController.postComment);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: Update an existing comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: Numeric ID of the comment to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Comment not found
 */
router.patch('/:id', commentsController.patchComment);

/**
 * @swagger
 * /comments:
 *   delete:
 *     summary: Delete all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: All comments deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/', commentsController.deleteAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: Numeric ID of the comment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
router.delete('/:id', commentsController.deleteComment);

module.exports = router;