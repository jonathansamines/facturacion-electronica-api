'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('condicion_entrega', (table) => {

        table.string('id_condicion_entrega').notNullable().primary();
        table.string('designacion').notNullable();
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('condicion_entrega');
};
