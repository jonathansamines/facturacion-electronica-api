'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/api/productos',
        options: {
            validate: {
                query: {
                    busqueda: Joi.string().required()
                }
            },
            handler: (request, h) => {

                const idEmpresa = request.auth.credentials.id_empresa;
                const { busqueda } = request.query;
                const { Producto } = request.models();

                return Producto
                    .buscarProducto(idEmpresa, busqueda);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/productos',
        options: {
            validate: {
                payload: {
                    descripcion: Joi.string().required(),
                    marca: Joi.string().required(),
                    precio: Joi.number().required(),
                    id_moneda: Joi.string().required(),
                    id_tipo_producto: Joi.number().required(),
                    id_unidad_medida: Joi.string().required()
                }
            },
            handler: (request, h) => {

                const idEmpresa = request.auth.credentials.id_empresa;
                const producto = {
                    ...request.payload,
                    id_empresa: idEmpresa
                };

                const { Producto } = request.models();

                return Producto
                    .query()
                    .eager('unidad_medida')
                    .insert(producto);
            }
        }
    }
];
