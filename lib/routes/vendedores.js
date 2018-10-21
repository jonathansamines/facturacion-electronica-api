'use strict';

const Boom = require('boom');
const Joi = require('joi');

module.exports = [
    {
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
    },
    {
        method: 'POST',
        path: '/api/vendedores',
        options: {
            validate: {
                payload: {
                    nit: Joi.string().required(),
                    cui: Joi.string().required(),
                    nombre: Joi.string().required(),
                    apellido: Joi.string().required(),
                    id_sucursal: Joi.number().required()
                }
            },
            handler: async (request, h) => {

                const idEmpresa = request.auth.credentials.id_empresa;
                const { Sucursal, Vendedor } = request.models();

                const sucursal = await Sucursal.buscarSucursalEnEmpresa(idEmpresa, request.payload.id_sucursal);

                if (sucursal === undefined) {
                    throw Boom.badRequest('La sucursal indicada no pertenece a la empresa asociada a su cuenta');
                }

                return Vendedor
                    .query()
                    .eager('sucursal')
                    .insert(request.payload);
            }
        }
    }
];
