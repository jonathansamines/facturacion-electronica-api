'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('unidad_gravable_impuesto', (table) => {

        table.increments('id_unidad_gravable_impuesto').primary();
        table.string('tipo_valor').notNullable();
        table.decimal('valor').notNullable();
        table.string('nombre').notNullable();
        table.string('nombre_corto').notNullable();

        table.integer('id_impuesto').notNullable();
        table.foreign('id_impuesto').references('id_impuesto').inTable('impuesto');

        table.string('id_moneda').notNullable();
        table.foreign('id_moneda').references('id_moneda').inTable('moneda');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('unidad_gravable_impuesto');
};
