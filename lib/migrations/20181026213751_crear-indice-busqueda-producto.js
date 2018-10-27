'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.alterTable('producto', (table) => {

        table.index(['descripcion', 'nombre', 'marca']);
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.alterTable('producto', (table) => {

        table.dropIndex(['descripcion', 'nombre', 'marca']);
    });
};
