'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('producto_factura', (table) => {

        table.integer('id_producto').unsigned();
        table.integer('id_factura').unsigned();
        table.primary(['id_producto', 'id_factura']);

        table.foreign('id_producto').references('id_producto').inTable('producto');
        table.foreign('id_factura').references('id_factura').inTable('factura');

        table.integer('cantidad').notNullable();
        table.decimal('impuesto_unitario').notNullable();

        table.decimal('descuento').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('producto_factura');
};
