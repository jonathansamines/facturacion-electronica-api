'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/api/tipos-documento',
    options: {
        validate: {
            query: {
                afiliacion: Joi.string().required()
            }
        },
        handler: async (request, h) => {

            const idAfiliacion = request.query.afiliacion;
            const { AfiliacionIVA } = request.models();

            const afiliacion = await AfiliacionIVA
                .query()
                .eager('tipos_documentos')
                .findById(idAfiliacion);


            if (afiliacion === undefined) {
                return Boom.notFound('Afiliación no existente');
            }

            return afiliacion;
        }
    }
};
