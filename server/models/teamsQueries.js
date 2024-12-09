const knex = require("../config/connection.js");

async function all() {
    return knex('teams');
}

async function get(id) {
    const results = await knex('teams').where({ team_id: id });
    return results[0];
}

async function create(name) {
    const results = await knex('teams').insert({ name }).returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('teams').where({ team_id: id }).update({ ...properties }).returning('*');
    return results[0];
}

// delete is a reserved keyword
async function del(id) {
    const results = await knex('teams').where({ team_id: id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('teams').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}