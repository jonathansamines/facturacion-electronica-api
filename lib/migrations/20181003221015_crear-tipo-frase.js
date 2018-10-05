'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('tipo_frase', (table) => {

        table.integer('id_tipo_frase').notNullable().primary();
        table.string('descripcion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('tipo_frase');
};
