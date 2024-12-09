exports.up = function (knex) {
    return knex.schema.createTable('teams', function (table) {
        table.increments('team_id').primary();
        table.string('name');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


exports.down = function (knex) {
    return knex.schema.dropTable('teams');
};