'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('complemento_tipo_documento', (table) => {

        table.integer('id_complemento').notNullable();
        table.string('id_tipo_documento').notNullable();
        table.boolean('requerido').defaultTo(false);

        table.primary(['id_complemento', 'id_tipo_documento']);

        table.foreign('id_complemento').references('id_complemento').inTable('complemento');
        table.foreign('id_tipo_documento').references('id_tipo_documento').inTable('tipo_documento');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('complemento_tipo_documento');
};
