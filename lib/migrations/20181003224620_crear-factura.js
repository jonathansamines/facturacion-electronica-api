'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('factura', (table) => {

        table.increments('id_factura').primary();
        table.decimal('total').notNullable();

        table.integer('id_vendedor').unsigned();
        table.foreign('id_vendedor').references('id_vendedor').inTable('vendedor');

        table.string('id_moneda').notNullable();
        table.foreign('id_moneda').references('id_moneda').inTable('moneda');

        table.integer('id_cliente').unsigned();
        table.foreign('id_cliente').references('id_cliente').inTable('cliente');

        table.integer('id_sucursal').unsigned();
        table.foreign('id_sucursal').references('id_sucursal').inTable('sucursal');

        table.integer('id_usuario').unsigned();
        table.foreign('id_usuario').references('id_usuario').inTable('usuario');

        table.string('id_tipo_documento').notNullable();
        table.foreign('id_tipo_documento').references('id_tipo_documento').inTable('tipo_documento');

        table.datetime('fecha_emision').notNullable().defaultTo(knex.fn.now());
        table.boolean('exportacion').defaultTo(false);
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('factura');
};
