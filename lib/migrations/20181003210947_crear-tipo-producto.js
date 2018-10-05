'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('tipo_producto', (table) => {

        table.increments('id_tipo_producto').primary();
        table.string('descripcion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('tipo_producto');
};
