'use strict';

const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/api/empresas/{idEmpresa}',
    options: {
        handler: (request, h) => {

            const { idEmpresa } = request.params;
            const { Empresa } = request.models();

            return Empresa
                .query()
                .eager('sucursales')
                .findById(idEmpresa);
        }
    }
};
