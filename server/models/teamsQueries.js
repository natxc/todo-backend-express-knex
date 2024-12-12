const knex = require("../config/connection.js");

async function all() {
    return knex('teams');
}

async function get(id) {
    const results = await knex('teams').where({ team_id: id });
    return results[0];
}

async function create(teamData) {
    const results = await knex('teams')
        .insert(teamData)
        .returning('*');
    return results[0];
}


async function update(id, properties) {
    const results = await knex('teams')
        .where({ team_id: id })
        .update({ ...properties, updated_at: knex.fn.now() })
        .returning('*');
    return results[0];
}

async function del(id) {
    const results = await knex('teams').where({ team_id: id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('teams').del().returning('*');
}

async function getTeamsByUserId(userId) {
    try {
        console.log('Querying teams for user_id:', userId);

        const teams = await knex('teams')
            .where({ user_id: userId })
            .select('*');
        console.log('Teams found:', teams);

        return teams;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
}

async function deleteAllByUserId(userId) {
    return knex('teams').where({ user_id: userId }).del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear,
    getTeamsByUserId,
    deleteAllByUserId
};