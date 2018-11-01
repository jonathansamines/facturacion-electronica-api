'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('pais', (table) => {

        table.string('id_pais').notNullable().primary();
        table.string('descripcion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('pais');
};
