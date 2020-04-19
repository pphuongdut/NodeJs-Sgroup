exports.up = function (knex) {
    return knex.schema.createTable('role', (table) => {
        table.integer('role_id').unique().primary();
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

exports.up = function (knex) {
    return knex.schema.createTable('product_types', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('product_type_name', 255).notNullable();
        table.string('product_type_slug', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('product_types');
};

exports.up = function (knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.integer('product_type_id').unsigned();
        table
            .foreign('product_type_id')
            .references('id')
            .inTable('product_types')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('user_id').unsigned();
        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('product_name', 255).notNullable();
        table.string('product_slug', 255).notNullable();
        table.string('img_src', 255).notNullable();
        table.string('product_description', 255).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            );
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('products');
};
