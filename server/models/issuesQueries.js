const knex = require("../config/connection.js");

async function all() {
    return knex('issues');
}

async function get(id) {
    const results = await knex('issues').where({ issue_id: id });
    return results[0];
}

async function create(data) {
    const results = await knex('issues').insert(data).returning('*');
    return results[0];
}

async function update(id, properties) {
    const allowedFields = [
        'title',
        'description',
        'status',
        'priority',
        'project_id',
        'reported_by',
        'assigned_to',
        'due_date',
    ];
    const filteredProps = Object.keys(properties)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = properties[key];
            return obj;
        }, {});

    const results = await knex('issues')
        .where({ issue_id: id })
        .update(filteredProps)
        .returning('*');
    return results[0];
}

async function del(id) {
    const results = await knex('issues').where({ issue_id: id }).del().returning('*');
    return results[0];
}

async function clear() {
    return knex('issues').del().returning('*');
}

async function getIssuesByUserId(userId) {
    return knex('issues')
        .where({ user_id: userId })
        .select('*');
}


module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear,
    getIssuesByUserId
};
