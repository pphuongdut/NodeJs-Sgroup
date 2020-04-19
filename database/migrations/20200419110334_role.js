exports.up = function (knex) {
    return knex.schema.createTable('role', (table) => {
        table.increments('role_id').unique().primary();
        table.string('role_name', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('role');
};
