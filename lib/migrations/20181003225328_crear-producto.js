'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('producto', (table) => {

        table.increments('id_producto').primary();
        table.string('descripcion').notNullable();
        table.string('marca').notNullable();
        table.decimal('precio').notNullable();

        table.string('id_moneda').notNullable();
        table.foreign('id_moneda').references('id_moneda').inTable('moneda');

        table.integer('id_tipo_producto').notNullable();
        table.foreign('id_tipo_producto').references('id_tipo_producto').inTable('tipo_producto');

        table.string('id_unidad_medida').notNullable();
        table.foreign('id_unidad_medida').references('id_unidad_medida').inTable('unidad_medida');

        table.integer('id_empresa').unsigned();
        table.foreign('id_empresa').references('id_empresa').inTable('empresa');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('producto');
};
