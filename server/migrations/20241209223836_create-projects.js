exports.up = function(knex) {
    return knex.schema.createTable('projects', function (table) {
        table.increments('project_id').primary();
        table.string('name');
        table.integer('team_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};
