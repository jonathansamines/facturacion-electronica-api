'use strict';

exports.seed = async (knex, Promise) => {

    await knex('afiliacion_iva_tipo_documento').del();
    await knex('afiliacion_iva').del();
    await knex('tipo_documento').del();

    await knex('tipo_documento').insert(require('./fixtures/tipos-documentos'));
    await knex('afiliacion_iva').insert(require('./fixtures/afiliacion-iva'));
    await knex('afiliacion_iva_tipo_documento').insert(require('./fixtures/afiliacion-iva-tipo-documento.json'));
};
