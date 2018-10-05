'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('sucursal', (table) => {

        table.increments('id_sucursal').primary();
        table.string('descripcion').notNullable();
        table.string('direccion');

        table.integer('id_empresa').unsigned();
        table.foreign('id_empresa').references('id_empresa').inTable('empresa');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('sucursal');
};
