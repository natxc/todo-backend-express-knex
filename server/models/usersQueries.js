const knex = require("../config/connection.js");
const bcrypt = require('bcrypt');

async function all() {
    return knex('users');
}

async function get(id) {
    const results = await knex('users').where({ user_id: id });
    return results[0];
}

async function create({ name, email, password }) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const results = await knex('users')
            .insert({ name, email, password: hashedPassword })
            .returning('*');
        return results[0];
    } catch (err) {
        console.error('Database error during user creation:', err);
        throw err;
    }
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

async function findByEmail(email) {
    try {
        const user = await knex('users').where({ email }).first();
        console.log('User fetched from DB:', user);
        return user;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
}


module.exports = {
    all,
    get,
    create,
    update,
    delete: del,
    clear,
    findByEmail
};
