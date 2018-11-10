'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('producto_factura', (table) => {

        table.integer('id_producto').unsigned();
        table.integer('id_factura').unsigned();
        table.primary(['id_producto', 'id_factura']);

        table.string('id_unidad_medida').notNullable();
        table.foreign('id_unidad_medida').references('id_unidad_medida').inTable('unidad_medida');

        table.foreign('id_producto').references('id_producto').inTable('producto');
        table.foreign('id_factura').references('id_factura').inTable('factura');

        table.decimal('cantidad').notNullable();
        table.decimal('total_impuestos').notNullable();
        table.decimal('descuento').notNullable();
        table.decimal('total').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('producto_factura');
};
