'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/unidades-gravables',
    options: {
        validate: {
            query: {
                impuestos: Joi.array().unique().items(Joi.number())
            }
        },
        handler: (request, h) => {

            const { UnidadGravable } = request.models();
            const { impuestos } = request.query;

            return UnidadGravable.obtenerUnidadesGravablesPorImpuestos(impuestos);
        }
    }
};
