'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('municipio', (table) => {

        table.string('id_municipio').notNullable().primary();
        table.string('descripcion').notNullable();

        table.string('id_departamento').notNullable();
        table.foreign('id_departamento').references('id_departamento').inTable('departamento');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('municipio');
};
