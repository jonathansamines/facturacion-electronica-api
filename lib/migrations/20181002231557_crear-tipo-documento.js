'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('tipo_documento', (table) => {

        table.string('id_tipo_documento').notNullable().primary();
        table.string('descripcion').notNullable();
        table.boolean('exportacion').defaultTo(false);
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('tipo_documento');
};
