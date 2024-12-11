const _ = require('lodash');
const issues = require('../models/issuesQueries.js');

function createIssue(req, data) {
    const protocol = req.protocol,
        host = req.get('host'),
        id = data.issue_id;

    return {
        issue_id: id,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        project_id: data.project_id,
        reported_by: data.reported_by,
        assigned_to: data.assigned_to,
        due_date: data.due_date,
        created_at: data.created_at,
        updated_at: data.updated_at,
        url: `${protocol}://${host}/${id}`,
    };
}

async function getAllIssues(req, res) {
    const allEntries = await issues.all();
    return res.send(allEntries.map(_.curry(createIssue)(req)));
}

async function getIssue(req, res) {
    const issue = await issues.get(req.params.id);
    return res.send(createIssue(req, issue));
}

async function postIssue(req, res) {
    const created = await issues.create(req.body);
    return res.send(createIssue(req, created));
}

async function patchIssue(req, res) {
    const patched = await issues.update(req.params.id, req.body);
    return res.send(createIssue(req, patched));
}

async function deleteAllIssues(req, res) {
    const deletedEntries = await issues.clear();
    return res.send(deletedEntries.map(_.curry(createIssue)(req)));
}

async function deleteIssue(req, res) {
    const deleted = await issues.delete(req.params.id);
    return res.send(createIssue(req, deleted));
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
    getAllIssues: { method: getAllIssues, errorMessage: "Could not fetch all issues" },
    getIssue: { method: getIssue, errorMessage: "Could not fetch issue" },
    postIssue: { method: postIssue, errorMessage: "Could not post issue" },
    patchIssue: { method: patchIssue, errorMessage: "Could not patch issue" },
    deleteAllIssues: { method: deleteAllIssues, errorMessage: "Could not delete all issues" },
    deleteIssue: { method: deleteIssue, errorMessage: "Could not delete issue" },
};

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;
