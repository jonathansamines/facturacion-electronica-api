'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('unidad_medida', (table) => {

        table.string('id_unidad_medida').notNullable().primary();
        table.string('descripcion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('unidad_medida');
};
