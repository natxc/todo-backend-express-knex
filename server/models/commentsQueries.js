const knex = require("../config/connection.js");

async function all() {
    return knex('comments');
}

async function get(id) {
    const results = await knex('comments').where({ comment_id: id });
    return results[0];
}

async function create({ content, issue_id, author_id }) {
    const results = await knex('comments')
        .insert({ content, issue_id, author_id })
        .returning('*');
    return results[0];
}

async function update(id, properties) {
    const results = await knex('comments')
        .where({ comment_id: id })
        .update({ ...properties, updated_at: knex.fn.now() })
        .returning('*');
    return results[0];
}

async function del(id) {
    const results = await knex('comments').where({ comment_id: id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('comments').del().returning('*');
}

module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear
}