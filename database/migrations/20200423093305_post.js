exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments('post_id').primary();
        table.integer('category_id').unsigned();
        table
            .foreign('category_id')
            .references('category_id')
            .inTable('categories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('user_id').unsigned();
        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('post_title', 255).notNullable();
        table.longText('post_content').notNullable();
        table.string('post_slug', 255).notNullable();
        table.string('img_src', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
