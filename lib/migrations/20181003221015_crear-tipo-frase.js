'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('tipo_frase', (table) => {

        table.increments('id_tipo_frase').primary();
        table.string('descripcion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('tipo_frase');
};
