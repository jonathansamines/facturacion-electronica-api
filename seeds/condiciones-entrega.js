'use strict';

exports.seed = async (knex, Promise) => {

    await knex('condicion_entrega').del();

    return knex('condicion_entrega').insert(require('./fixtures/condiciones-entrega'));
};
