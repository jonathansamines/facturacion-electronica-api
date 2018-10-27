'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/api/tipos-documento/{idTipoDocumento}',
    options: {
        validate: {
            params: {
                idTipoDocumento: Joi.string().required()
            }
        },
        handler: async (request, h) => {

            const { idTipoDocumento } = request.params;
            const { TipoDocumento } = request.models();

            const tipoDocumento = await TipoDocumento
                .query()
                .eager('[tipos_frase.frases, impuestos]')
                .findById(idTipoDocumento);

            if (tipoDocumento === undefined) {
                return Boom.notFound('Tipo de documento no existe');
            }

            return tipoDocumento;
        }
    }
};
