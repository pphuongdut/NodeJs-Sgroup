

exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('fullname', 255).notNullable();
        table.string('username', 255).notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('user_slug', 255).notNullable();
        table.integer('roleId').unsigned();
        table
            .foreign('roleId')
            .references('role_id')
            .inTable('role')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};