'use strict';

module.exports = {
    method: 'GET',
    path: '/api/condiciones-entrega',
    options: {
        handler: (request, h) => {

            const { CondicionEntrega } = request.models();

            return CondicionEntrega.query();
        }
    }
};
