exports.up = function (knex) {
    return knex.schema.createTable('comments', function (table) {
        table.increments('comment_id').primary();
        table.string('content');
        table.integer('issue_id');
        table.integer('author_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};