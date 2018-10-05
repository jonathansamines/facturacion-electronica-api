'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('moneda', (table) => {

        table.increments('id_moneda').primary();
        table.string('descripcion').notNullable();
        table.string('codigo').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('moneda');
};
