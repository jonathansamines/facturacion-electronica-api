'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/tipos-documento',
    options: {
        validate: {
            query: {
                afiliacion: Joi.number().required()
            }
        },
        handler: (request, h) => {

            const codigoAfiliacion = request.query.afiliacion;
            const { AfiliacionIVA } = request.models();

            return AfiliacionIVA
                .query()
                .eager('tipos_documentos')
                .findById(codigoAfiliacion);
        }
    }
};
