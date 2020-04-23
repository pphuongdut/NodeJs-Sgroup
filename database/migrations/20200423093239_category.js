exports.up = function (knex) {
    return knex.schema.createTable('categories', (table) => {
        table.increments('category_id').primary();
        table.integer('user_id').unsigned();
        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('category_name', 255).notNullable();
        table.string('category_slug', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('categories');
};
