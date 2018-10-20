'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/productos',
    options: {
        validate: {
            query: {
                busqueda: Joi.string().required()
            }
        },
        handler: (request, h) => {

            const idEmpresa = request.auth.credentials.id_empresa;
            const { busqueda } = request.query;
            const { Producto } = request.models();

            return Producto
                .buscarProducto(idEmpresa, busqueda);
        }
    }
};
