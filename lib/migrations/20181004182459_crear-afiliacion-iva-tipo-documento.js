'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('afiliacion_iva_tipo_documento', (table) => {

        table.integer('id_afiliacion_iva').unsigned();
        table.integer('id_tipo_documento').unsigned();

        table.foreign('id_afiliacion_iva').references('id_afiliacion_iva').inTable('afiliacion_iva');
        table.foreign('id_tipo_documento').references('id_tipo_documento').inTable('tipo_documento');

        table.primary(['id_afiliacion_iva', 'id_tipo_documento']);
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('afiliacion_iva_tipo_documento');
};
