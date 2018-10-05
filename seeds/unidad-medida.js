'use strict';

/**
 * Unidades de medida tomadas de SAT-IA-008
 *
 * @param {*} knex
 * @param {*} Promise
 */
exports.seed = async (knex, Promise) => {

    await knex('unidad_medida').del();

    return knex('unidad_medida').insert(require('./fixtures/unidades-medida'));
};
