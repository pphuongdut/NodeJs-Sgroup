exports.up = function(knex) {
    return knex.schema.createTable('product_types', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().unique;
        table
            .foreign('user_id')
            .references('id')
            .inTable('users');
        table.string('product_type_name', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('product_types');
};
