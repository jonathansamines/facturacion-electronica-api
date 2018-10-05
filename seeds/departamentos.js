'use strict';

exports.seed = async (knex, Promise) => {

    await knex('municipio').del();
    await knex('departamento').del();

    await knex('departamento').insert(require('./fixtures/departamentos'));
    await knex('municipio').insert(require('./fixtures/municipios'));
};
