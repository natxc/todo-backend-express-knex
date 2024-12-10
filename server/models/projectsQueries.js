const knex = require("../config/connection.js");

async function all() {
    return knex('projects');
}

async function get(id) {
    const results = await knex('projects').where({ project_id: id });
    return results[0];
}

async function create({ name, team_id }) {
    const results = await knex('projects')
        .insert({ name, team_id })
        .returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('projects')
        .where({ project_id: id })
        .update({ ...properties, updated_at: knex.fn.now() })
        .returning('*');
    return results[0];
}

async function del(id) {
    const results = await knex('projects').where({ project_id: id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('projects').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}