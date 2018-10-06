'use strict';

exports.seed = async (knex, Promise) => {


    await knex('unidad_gravable_impuesto').del();
    await knex('impuesto_tipo_documento').del();
    await knex('tipo_frase_tipo_documento').del();
    await knex('afiliacion_iva_tipo_documento').del();
    await knex('frase').del();
    await knex('tipo_frase').del();
    await knex('afiliacion_iva').del();
    await knex('tipo_documento').del();
    await knex('moneda').del();
    await knex('impuesto').del();

    await knex('tipo_frase').insert(require('./fixtures/tipo-frase'));
    await knex('tipo_documento').insert(require('./fixtures/tipos-documentos'));
    await knex('afiliacion_iva').insert(require('./fixtures/afiliacion-iva'));
    await knex('frase').insert(require('./fixtures/frases'));
    await knex('afiliacion_iva_tipo_documento').insert(require('./fixtures/afiliacion-iva-tipo-documento.json'));
    await knex('tipo_frase_tipo_documento').insert(require('./fixtures/tipo-frase-tipo-documento'));
    await knex('impuesto').insert(require('./fixtures/impuestos'));
    await knex('moneda').insert(require('./fixtures/monedas'));
    await knex('unidad_gravable_impuesto').insert(require('./fixtures/unidad-gravable-impuesto'));
    await knex('impuesto_tipo_documento').insert(require('./fixtures/impuesto-tipo-documento'));
};
