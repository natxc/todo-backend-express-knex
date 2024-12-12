exports.up = function (knex) {
    return knex.schema.table('teams', function (table) {
        table
            .integer('user_id')
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE')
            .index();
    });
};

exports.down = function (knex) {
    return knex.schema.table('teams', function (table) {
        table.dropColumn('user_id');
    });
};
