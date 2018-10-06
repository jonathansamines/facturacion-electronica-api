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

            return Cliente
                .buscarCliente(busqueda);
        }
    }
};
