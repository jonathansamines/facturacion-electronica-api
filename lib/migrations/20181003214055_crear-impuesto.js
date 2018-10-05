'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('impuesto', (table) => {

        table.integer('id_impuesto').notNullable().primary();
        table.string('sigla').notNullable();
        table.string('nombre', 500).notNullable();
        table.string('nombre_corto', 500).notNullable();
        table.boolean('sumar_total_dte').defaultTo(false);
        table.boolean('mostrar_receptor').defaultTo(false);
        table.string('base_legal');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('impuesto');
};
