exports.up = function (knex) {
    return knex.schema.createTable('role', (table) => {
        table.increments('role_id').primary();
        table.string('role_name', 255).notNullable();
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('role');
};
