exports.up = function (knex) {
    return knex.schema.createTable('post_tags', (table) => {
        table.integer('post_id').unsigned();
        table
            .foreign('post_id')
            .references('post_id')
            .inTable('posts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('tag_id').unsigned();
        table
            .foreign('tag_id')
            .references('tag_id')
            .inTable('tags')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('post_tags');
};
