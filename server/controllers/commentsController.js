const _ = require('lodash');
const comments = require('../models/commentsQueries.js');

function createComment(req, data) {
    const protocol = req.protocol,
        host = req.get('host'),
        id = data.comment_id;

    return {
        comment_id: id,
        content: data.content,
        issue_id: data.issue_id,
        author_id: data.author_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        url: `${protocol}://${host}/${id}`,
    };
}


async function getAllComments(req, res) {
    const allComments = await comments.all();
    return res.send(allComments);
}

async function getComment(req, res) {
    const comment = await comments.get(req.params.id);
    return res.send(comment);
}

async function postComment(req, res) {
    const { content, issue_id, author_id } = req.body;
    const created = await comments.create({ content, issue_id, author_id });
    return res.send(createComment(req, created));
}

async function patchComment(req, res) {
    const updatedFields = req.body;
    const patched = await comments.update(req.params.id, updatedFields);
    return res.send(createComment(req, patched));
}

async function deleteAllComments(req, res) {
    const deletedComments = await comments.clear();
    return res.send(deletedComments.map(_.curry(createComment)(req)));
}

async function deleteComment(req, res) {
    const deleted = await comments.delete(req.params.id);
    return res.send(createComment(req, deleted));
}

function addErrorReporting(func, message) {
    return async function (req, res) {
        try {
            return await func(req, res);
        } catch (err) {
            console.log(`${message} caused by: ${err}`);
            res.status(500).send(`Oops! ${message}.`);
        }
    };
}

const toExport = {
    getAllComments: { method: getAllComments, errorMessage: "Could not fetch all comments" },
    getComment: { method: getComment, errorMessage: "Could not fetch comment" },
    postComment: { method: postComment, errorMessage: "Could not post comment" },
    patchComment: { method: patchComment, errorMessage: "Could not patch comment" },
    deleteAllComments: { method: deleteAllComments, errorMessage: "Could not delete all comments" },
    deleteComment: { method: deleteComment, errorMessage: "Could not delete comment" }
}

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;