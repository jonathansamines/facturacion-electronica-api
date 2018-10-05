'use strict';

exports.up = (knex, Promise) => {

    return knex.schema.createTable('usuario', (table) => {

        table.increments('id_usuario').primary();
        table.string('nombre').notNullable();
        table.string('apellido').notNullable();
        table.string('nombre_usuario').notNullable();
        table.string('correo_electronico').notNullable();
        table.string('password').notNullable();

        table.integer('id_empresa').unsigned();
        table.foreign('id_empresa').references('id_empresa').inTable('empresa');
    });
};

exports.down = (knex, Promise) => {

    return knex.schema.dropTable('usuario');
};
