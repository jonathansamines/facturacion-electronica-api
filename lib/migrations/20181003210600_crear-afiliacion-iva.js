'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('afiliacion_iva', (table) => {

        table.string('id_afiliacion_iva').notNullable().primary();
        table.string('descripcion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('afiliacion_iva');
};
