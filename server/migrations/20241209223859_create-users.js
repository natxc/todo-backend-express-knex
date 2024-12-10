exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('user_id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


exports.down = function (knex) {
    return knex.schema.dropTable('users');
};

