'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('frase', (table) => {

        table.increments('id_frase').primary();
        table.string('descripcion').notNullable();

        table.integer('id_tipo_frase').unsigned();
        table.foreign('id_tipo_frase').references('id_tipo_frase').inTable('tipo_frase');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('frase');
};
