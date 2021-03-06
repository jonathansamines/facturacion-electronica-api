'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/api/empresas',
        options: {
            auth: {
                mode: 'optional'
            },
            handler: (request, h) => {

                const { Empresa } = request.models();

                return Empresa
                    .query();
            }
        }
    }
];
