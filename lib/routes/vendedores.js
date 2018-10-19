'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/vendedores',
    options: {
        validate: {
            query: {
                busqueda: Joi.string().required()
            }
        },
        handler: (request, h) => {

            const idEmpresa = request.auth.credentials.id_empresa;
            const { busqueda } = request.query;
            const { Vendedor } = request.models();

            return Vendedor.buscarVendedor(idEmpresa, busqueda);
        }
    }
};
