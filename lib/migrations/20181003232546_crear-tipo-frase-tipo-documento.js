'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('tipo_frase_tipo_documento', (table) => {

        table.integer('id_tipo_frase').notNullable();
        table.string('id_tipo_documento').notNullable();
        table.primary(['id_tipo_frase', 'id_tipo_documento']);

        table.foreign('id_tipo_frase').references('id_tipo_frase').inTable('tipo_frase');
        table.foreign('id_tipo_documento').references('id_tipo_documento').inTable('tipo_documento');

    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('tipo_frase_tipo_documento');
};
