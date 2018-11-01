'use strict';

exports.seed = async (knex, Promise) => {

    await knex('municipio').del();
    await knex('departamento').del();
    await knex('pais').del();

    await knex('pais').insert(require('./fixtures/paises'));
    await knex('departamento').insert(require('./fixtures/departamentos'));
    await knex('municipio').insert(require('./fixtures/municipios'));
};
