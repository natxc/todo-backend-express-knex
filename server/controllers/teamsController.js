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
    try {
        const userId = req.user.user_id; // Extract user_id from authenticated user
        const userTeams = await teams.getTeamsByUserId(userId); // Fetch teams for the user
        return res.send(userTeams.map(_.curry(createTeam)(req)));
    } catch (err) {
        console.error("Error fetching all teams:", err);
        res.status(500).send("Could not fetch all teams.");
    }
}

async function getTeam(req, res) {
    try {
        const userId = req.user.user_id; // Extract user_id
        const team = await teams.get(req.params.id);

        if (!team || team.user_id !== userId) {
            return res.status(404).send("Team not found or you do not have access.");
        }

        return res.send(createTeam(req, team));
    } catch (err) {
        console.error("Error fetching team:", err);
        res.status(500).send("Could not fetch team.");
    }
}

async function postTeam(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send("Missing required field: name.");
    }

    try {
        const userId = req.user.user_id; // Extract user_id
        const created = await teams.create({ name, user_id: userId }); // Add user_id to the new team
        return res.status(201).send(createTeam(req, created));
    } catch (err) {
        console.error("Error creating team:", err);
        res.status(500).send("Could not create team.");
    }
}

async function patchTeam(req, res) {
    const updatedFields = req.body;

    if (!updatedFields.name) {
        return res.status(400).send("Missing required field: name.");
    }

    try {
        const userId = req.user.user_id; // Extract user_id
        const team = await teams.get(req.params.id);

        if (!team || team.user_id !== userId) {
            return res.status(404).send("Team not found or you do not have access.");
        }

        const patched = await teams.update(req.params.id, updatedFields);
        return res.send(createTeam(req, patched));
    } catch (err) {
        console.error("Error updating team:", err);
        res.status(500).send("Could not update team.");
    }
}

async function deleteAllTeams(req, res) {
    try {
        const userId = req.user.user_id; // Extract user_id
        const deletedTeams = await teams.deleteAllByUserId(userId); // Delete all teams for the user
        return res.send(deletedTeams.map(_.curry(createTeam)(req)));
    } catch (err) {
        console.error("Error deleting all teams:", err);
        res.status(500).send("Could not delete all teams.");
    }
}

async function deleteTeam(req, res) {
    try {
        const userId = req.user.user_id; // Extract user_id
        const team = await teams.get(req.params.id);

        if (!team || team.user_id !== userId) {
            return res.status(404).send("Team not found or you do not have access.");
        }

        const deleted = await teams.delete(req.params.id);
        return res.send(createTeam(req, deleted));
    } catch (err) {
        console.error("Error deleting team:", err);
        res.status(500).send("Could not delete team.");
    }
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
    postTeam: { method: postTeam, errorMessage: "Could not create team" },
    patchTeam: { method: patchTeam, errorMessage: "Could not update team" },
    deleteAllTeams: { method: deleteAllTeams, errorMessage: "Could not delete all teams" },
    deleteTeam: { method: deleteTeam, errorMessage: "Could not delete team" }
};

for (let route in toExport) {
    toExport[route] = addErrorReporting(toExport[route].method, toExport[route].errorMessage);
}

module.exports = toExport;
