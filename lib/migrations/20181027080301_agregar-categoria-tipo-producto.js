'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.alterTable('tipo_producto', (table) => {

        table.string('categoria').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.alterTable('tipo_producto', (table) => {

        table.dropColumn('categoria');
    });
};
