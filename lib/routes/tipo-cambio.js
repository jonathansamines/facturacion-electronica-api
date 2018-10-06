'use strict';

module.exports = {
    method: 'GET',
    path: '/api/tipo-cambio',
    options: {
        handler: (request, h) => {

            return request.server.methods.obtenerTipoDeCambioDelDia();
        }
    }
};
