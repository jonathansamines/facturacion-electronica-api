'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('impuesto', (table) => {

        table.increments('id_impuesto').primary();
        table.string('descripcion').notNullable();
        table.string('tipo_valor').notNullable();
        table.decimal('valor').notNullable();
        table.string('sigla').notNullable();
        table.string('nombre_corto').notNullable();
        table.boolean('sumar_total_dte').defaultTo(false);
        table.boolean('mostrar_receptor').defaultTo(false);
        table.string('base_legal');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('impuesto');
};
