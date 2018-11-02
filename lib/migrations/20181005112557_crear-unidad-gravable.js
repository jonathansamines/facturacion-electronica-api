'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('unidad_gravable', (table) => {

        table.integer('id_unidad_gravable').notNullable();
        table.string('tipo_valor').notNullable();
        table.decimal('valor').notNullable();
        table.string('nombre').notNullable();
        table.string('nombre_corto').notNullable();
        table.boolean('exportacion').defaultTo(true);

        table.integer('id_impuesto').notNullable();
        table.foreign('id_impuesto').references('id_impuesto').inTable('impuesto');

        table.string('id_moneda').notNullable();
        table.foreign('id_moneda').references('id_moneda').inTable('moneda');

        table.primary(['id_unidad_gravable', 'id_impuesto']);
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('unidad_gravable');
};
