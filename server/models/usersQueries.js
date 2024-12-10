const knex = require("../config/connection.js");

async function all() {
    return knex('users');
}

async function get(id) {
    const results = await knex('users').where({ user_id: id });
    return results[0];
}

async function create({ name, email, password }) {
    const results = await knex('users')
        .insert({ name, email, password })
        .returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('users')
        .where({ user_id: id })
        .update({ ...properties, updated_at: knex.fn.now() })
        .returning('*');
    return results[0];
}

async function del(id) {
    const results = await knex('users').where({ user_id: id }).del().returning('*');
    return results[0];
}

async function clear() {
    await knex('users').del();
    return [];
}


module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}