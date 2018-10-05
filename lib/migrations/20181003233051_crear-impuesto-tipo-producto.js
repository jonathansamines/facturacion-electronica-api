'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('impuesto_tipo_producto', (table) => {

        table.integer('id_impuesto').notNullable();
        table.integer('id_tipo_producto').unsigned();
        table.primary(['id_impuesto', 'id_tipo_producto']);

        table.foreign('id_impuesto').references('id_impuesto').inTable('impuesto');
        table.foreign('id_tipo_producto').references('id_tipo_producto').inTable('tipo_producto');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('impuesto_tipo_producto');
};
