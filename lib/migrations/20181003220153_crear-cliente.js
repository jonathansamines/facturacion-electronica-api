'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('cliente', (table) => {

        table.increments('id_cliente').primary();
        table.string('nombre').notNullable();
        table.string('apellido').notNullable();
        table.string('nit').notNullable();
        table.string('cui');
        table.string('direccion').notNullable();

        table.integer('id_municipio').unsigned();
        table.foreign('id_municipio').references('id_municipio').inTable('municipio');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('cliente');
};
