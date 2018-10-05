'use strict';

exports.seed = async (knex, Promise) => {

    await knex('unidad_gravable_impuesto').del();
    await knex('impuesto_tipo_documento').del();
    await knex('moneda').del();
    await knex('impuesto').del();

    await knex('impuesto').insert(require('./fixtures/impuestos'));
    await knex('moneda').insert(require('./fixtures/monedas'));
    await knex('unidad_gravable_impuesto').insert(require('./fixtures/unidad-gravable-impuesto'));
    await knex('impuesto_tipo_documento').insert(require('./fixtures/impuesto-tipo-documento'));
};
