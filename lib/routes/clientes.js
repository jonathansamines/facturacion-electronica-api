'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/clientes',
    options: {
        validate: {
            query: {
                busqueda: Joi.string().required()
            }
        },
        handler: (request, h) => {

            const { busqueda } = request.query;
            const { Cliente } = request.models();

            const terminoBusqueda = `%${busqueda}%`;

            return Cliente
                .query()
                .where('nombre', 'like', terminoBusqueda)
                .orWhere('apellido', 'like', terminoBusqueda)
                .orWhere('nit', 'like', terminoBusqueda)
                .orWhere('cui', 'like', terminoBusqueda);
        }
    }
};
