'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('departamento', (table) => {

        table.string('id_departamento').notNullable().primary();
        table.string('descripcion').notNullable();

        table.string('id_pais').notNullable();
        table.foreign('id_pais').references('id_pais').inTable('pais');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('departamento');
};
