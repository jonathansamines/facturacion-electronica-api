'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('cliente', (table) => {

        table.increments('id_cliente').primary();
        table.string('nombre').notNullable();
        table.string('apellido').notNullable();
        table.string('nit').notNullable();
        table.string('cui');
        table.string('direccion').notNullable();

        table.string('id_municipio').notNullable();
        table.foreign('id_municipio').references('id_municipio').inTable('municipio');

        table.integer('id_empresa').unsigned();
        table.foreign('id_empresa').references('id_empresa').inTable('empresa');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('cliente');
};
