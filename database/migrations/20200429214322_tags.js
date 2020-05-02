exports.up = function (knex) {
    return knex.schema.createTable('tags', (table) => {
        table.increments('tag_id').primary();
        table.string('tag_name').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tags');
};
