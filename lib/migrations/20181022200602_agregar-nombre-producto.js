'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.alterTable('producto', (table) => {

        table.string('nombre').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.alterTable('producto', (table) => {

        table.dropColumn('nombre');
    });
};
