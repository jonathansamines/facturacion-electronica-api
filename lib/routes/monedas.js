'use strict';

module.exports = {
    method: 'GET',
    path: '/api/monedas',
    options: {
        handler: (request, h) => {

            const { Moneda } = request.models();

            return Moneda.query();
        }
    }
};
