const _ = require('lodash');
const teams = require('../models/teamsQueries.js');

function createTeam(req, data) {
    const protocol = req.protocol,
        host = req.get('host'),
        id = data.team_id;

    return {
        team_id: id,
        name: data.name,
        created_at: data.created_at,
        updated_at: data.updated_at,
        url: `${protocol}://${host}/${id}`,
    };
}


async function getAllTeams(req, res) {
    const allEntries = await teams.all();
    return res.send(allEntries);
    }

async function getTeam(req, res) {
    const team = await teams.get(req.params.id);
    return res.send(team);
}

async function postTeam(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send("Missing required field: name.");
    }

    try {
        const created = await teams.create({ name });
        return res.send(createTeam(req, created));
    } catch (err) {
        console.error("Error creating team:", err);
        res.status(500).send("Error creating team.");
    }
}


async function patchTeam(req, res) {
    const updatedFields = req.body;

    if (!updatedFields.name) {
        return res.status(400).send("Missing required field: name.");
    }

    try {
        const patched = await teams.update(req.params.id, updatedFields);
        return res.send(createTeam(req, patched));
    } catch (err) {
        console.error("Error updating team:", err);
        res.status(500).send("Error updating team.");
    }
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