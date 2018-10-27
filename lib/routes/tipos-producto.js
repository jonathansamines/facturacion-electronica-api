'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/tipos-producto',
    options: {
        validate: {
            query: {
                tipo_documento: Joi.string().required()
            }
        },
        handler: async (request, h) => {

            const { TipoProducto, TipoDocumento } = request.models();
            const { tipo_documento } = request.query;

            const impuestos = await TipoDocumento.obtenerIdImpuestosPorId(tipo_documento);

            return TipoProducto.obtenerTipoProductosPorImpuestos(impuestos);
        }
    }
};
