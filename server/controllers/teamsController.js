const _ = require('lodash');
const teams = require('../models/teamsQueries.js');

function createTeam(req, data) {
    const protocol = req.protocol,
        host = req.get('host'),
        id = data.id;

    return {
        name: data.name,
        url: `${protocol}://${host}/${id}`,
    };
}

async function getAllTeams(req, res) {
    const allEntries = await teams.all();
    return res.send(allEntries.map(_.curry(createTeam)(req)));
}

async function getTeam(req, res) {
    const team = await teams.get(req.params.id);
    return res.send(team);
}

async function postTeam(req, res) {
    const created = await teams.create(req.body.name);
    return res.send(createToDo(req, created));
}

async function patchTeam(req, res) {
    const patched = await teams.update(req.params.id, req.body);
    return res.send(createTeam(req, patched));
}

async function deleteAllTeams(req, res) {
    const deletedTeams = await teams.clear();
    return res.send(deletedTeams.map(_.curry(createTeam)(req)));
}

async function deleteTeam(req, res) {
    const deleted = await teams.delete(req.params.id);
    return res.send(createTeam(req, deleted));
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
    getAllTeams: { method: getAllTeams, errorMessage: "Could not fetch all teams" },
    getTeam: { method: getTeam, errorMessage: "Could not fetch team" },
    postTeam: { method: postTeam, errorMessage: "Could not post team" },
    patchTeam: { method: patchTeam, errorMessage: "Could not patch team" },
    deleteAllTeams: { method: deleteAllTeams, errorMessage: "Could not delete all teams" },
    deleteTeam: { method: deleteTeam, errorMessage: "Could not delete team" }
}

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;