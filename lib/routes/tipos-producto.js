'use strict';

const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/tipos-producto',
    options: {
        handler: (request, h) => {

            const { TipoProducto } = request.models();

            return TipoProducto.query();
        }
    }
};
