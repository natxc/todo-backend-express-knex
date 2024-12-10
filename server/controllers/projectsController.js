const _ = require('lodash');
const projects = require('../models/projectsQueries.js');

function createProject(req, data) {
    const protocol = req.protocol,
        host = req.get('host'),
        id = data.project_id;

    return {
        project_id: id,
        name: data.name,
        team_id: data.team_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        url: `${protocol}://${host}/${id}`,
    };
}

async function getAllProjects(req, res) {
    const allEntries = await projects.all();
    return res.send(allEntries);
}

async function getProject(req, res) {
    const project = await projects.get(req.params.id);
    return res.send(project);
}

async function postProject(req, res) {
    const { name, team_id } = req.body;

    if (!name || !team_id) {
        return res.status(400).send("Missing required fields: name or team_id.");
    }

    const created = await projects.create({ name, team_id });
    return res.send(createProject(req, created));
}

async function patchProject(req, res) {
    const updatedFields = req.body;

    const patched = await projects.update(req.params.id, updatedFields);
    return res.send(createProject(req, patched));
}


async function deleteAllProjects(req, res) {
    const deletedProjects = await projects.clear();
    return res.send(deletedProjects.map(_.curry(createProject)(req)));
}

async function deleteProject(req, res) {
    const deleted = await projects.delete(req.params.id);
    return res.send(createProject(req, deleted));
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
    getAllProjects: { method: getAllProjects, errorMessage: "Could not fetch all projects" },
    getProject: { method: getProject, errorMessage: "Could not fetch project" },
    postProject: { method: postProject, errorMessage: "Could not post project" },
    patchProject: { method: patchProject, errorMessage: "Could not patch project" },
    deleteAllProjects: { method: deleteAllProjects, errorMessage: "Could not delete all projects" },
    deleteProject: { method: deleteProject, errorMessage: "Could not delete project" }
}

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;