exports.up = function (knex) {
    return knex.schema.createTable('issues', function (table) {
        table.increments('issue_id').primary();
        table.integer('project_id');
        table.string('title');
        table.string('description');
        table.string('status');
        table.string('priority');
        table.integer('reported_by');
        table.integer('assigned_to');
        table.timestamp('due_date').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


exports.down = function (knex) {
    return knex.schema.dropTable('issues');
};