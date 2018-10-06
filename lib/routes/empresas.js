'use strict';

const Boom = require('boom');
const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/empresas/{idEmpresa}',
    options: {
        validate: {
            params: {
                idEmpresa: Joi.number().required()
            }
        },
        handler: async (request, h) => {

            const { idEmpresa } = request.params;
            const { Empresa } = request.models();

            const empresa = await Empresa
                .query()
                .eager('sucursales')
                .findById(idEmpresa);

            if (empresa === undefined) {
                throw Boom.notFound('Empresa no existe');
            }

            return empresa;
        }
    }
};
