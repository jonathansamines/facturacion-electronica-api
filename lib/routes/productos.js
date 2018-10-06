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

            const { busqueda } = request.query;
            const { Producto } = request.models();

            return Producto
                .buscarProducto(busqueda);
        }
    }
};
