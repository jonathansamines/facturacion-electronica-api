'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('municipio', (table) => {

        table.increments('id_municipio').primary();
        table.string('descripcion').notNullable();
        table.string('codigo').notNullable();

        table.integer('id_departamento').unsigned();
        table.foreign('id_departamento').references('id_departamento').inTable('departamento');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('municipio');
};
