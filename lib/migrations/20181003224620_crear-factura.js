'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('factura', (table) => {

        table.increments('id_factura').primary();

        table.integer('id_vendedor').unsigned();
        table.foreign('id_vendedor').references('id_vendedor').inTable('vendedor');

        table.integer('id_sucursal').unsigned();
        table.foreign('id_sucursal').references('id_sucursal').inTable('sucursal');

        table.integer('id_usuario').unsigned();
        table.foreign('id_usuario').references('id_usuario').inTable('usuario');

        table.integer('id_tipo_documento').unsigned();
        table.foreign('id_tipo_documento').references('id_tipo_documento').inTable('tipo_documento');

        table.integer('id_factura_sat').unsigned();

        table.datetime('fecha_creacion').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('factura');
};
