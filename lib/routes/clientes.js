'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/api/clientes',
        options: {
            validate: {
                query: {
                    busqueda: Joi.string().required()
                }
            },
            handler: (request, h) => {

                const idEmpresa = request.auth.credentials.id_empresa;
                const { busqueda } = request.query;
                const { Cliente } = request.models();

                return Cliente
                    .buscarCliente(idEmpresa, busqueda);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/clientes',
        options: {
            validate: {
                payload: {
                    nit: Joi.string().required(),
                    cui: Joi.string().required(),
                    nombre: Joi.string().required(),
                    direccion: Joi.string().required(),
                    apellido: Joi.string().required(),
                    id_municipio: Joi.string().required(),
                    correo_electronico: Joi.string().allow('')
                }
            },
            handler: (request, h) => {

                const idEmpresa = request.auth.credentials.id_empresa;
                const cliente = {
                    ...request.payload,
                    id_empresa: idEmpresa
                };

                const { Cliente } = request.models();

                return Cliente
                    .query()
                    .insert(cliente);
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/clientes/{idCliente}',
        options: {
            validate: {
                params: {
                    idCliente: Joi.number().required()
                },
                payload: {
                    nit: Joi.string().required(),
                    cui: Joi.string().required(),
                    nombre: Joi.string().required(),
                    direccion: Joi.string().required(),
                    apellido: Joi.string().required(),
                    id_municipio: Joi.string().required(),
                    correo_electronico: Joi.string().allow('')
                }
            },
            handler: (request, h) => {

                const { idCliente } = request.params;
                const { Cliente } = request.models();

                return Cliente
                    .query()
                    .patchAndFetchById(idCliente, request.payload);
            }
        }
    }
];
