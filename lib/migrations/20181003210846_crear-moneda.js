'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('moneda', (table) => {

        table.string('id_moneda').notNullable().primary();
        table.string('descripcion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('moneda');
};
