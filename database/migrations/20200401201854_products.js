exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table
            .integer('product_type_id')
            .unsigned()
            .unique();
        table
            .foreign('product_type_id')
            .references('id')
            .inTable('product_types');
        table.integer('user_id').unsigned().unique;
        table
            .foreign('user_id')
            .references('id')
            .inTable('users');
        table.string('product_name', 255).notNullable();
        table.string('product_description', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
