'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('impuesto_tipo_documento', (table) => {

        table.integer('id_impuesto').unsigned();
        table.integer('id_tipo_documento').unsigned();
        table.primary(['id_impuesto', 'id_tipo_documento']);

        table.foreign('id_impuesto').references('id_impuesto').inTable('impuesto');
        table.foreign('id_tipo_documento').references('id_tipo_documento').inTable('tipo_documento');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('impuesto_tipo_documento');
};
