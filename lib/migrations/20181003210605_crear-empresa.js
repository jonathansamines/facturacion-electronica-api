'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('empresa', (table) => {

        table.increments('id_empresa').primary();
        table.string('nombre_legal').notNullable();
        table.string('nombre_comercial').notNullable();
        table.string('nit').notNullable();
        table.string('direccion').notNullable();

        table.string('id_afiliacion_iva').notNullable();
        table.foreign('id_afiliacion_iva').references('id_afiliacion_iva').inTable('afiliacion_iva');

        table.string('id_municipio').notNullable();
        table.foreign('id_municipio').references('id_municipio').inTable('municipio');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('empresa');
};
