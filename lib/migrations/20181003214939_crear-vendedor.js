'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('vendedor', (table) => {

        table.increments('id_vendedor').primary();
        table.string('nombre').notNullable();
        table.string('apellido').notNullable();
        table.string('nit');
        table.string('cui');

        table.integer('id_sucursal').unsigned();
        table.foreign('id_sucursal').references('id_sucursal').inTable('sucursal');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('vendedor');
};
