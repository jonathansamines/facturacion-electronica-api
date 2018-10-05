'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('tipo_documento', (table) => {

        table.increments('id_tipo_documento').primary();
        table.string('descripcion').notNullable();
        table.string('codigo').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('tipo_documento');
};
