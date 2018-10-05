'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('departamento', (table) => {

        table.increments('id_departamento').primary();
        table.string('descripcion').notNullable();
        table.string('codigo').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('departamento');
};
