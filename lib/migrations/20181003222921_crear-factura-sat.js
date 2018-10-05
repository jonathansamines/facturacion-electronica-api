'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('factura_sat', (table) => {

        table.increments('id_factura_sat').primary();
        table.string('firma_emisor').notNullable();
        table.string('firma_certificador').notNullable();
        table.datetime('fecha_certificacion').notNullable();

        table.integer('id_factura').unsigned();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('factura_sat');
};
