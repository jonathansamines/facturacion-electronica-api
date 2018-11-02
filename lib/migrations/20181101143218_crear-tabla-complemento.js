'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('complemento', (table) => {

        table.integer('id_complemento').notNullable().primary();
        table.string('descripcion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('complemento');
};
