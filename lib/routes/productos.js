'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/api/productos',
        options: {
            validate: {
                query: {
                    busqueda: Joi.string().required(),
                    tipo_documento: Joi.string().required()
                }
            },
            handler: async (request, h) => {

                const idEmpresa = request.auth.credentials.id_empresa;
                const { busqueda, tipo_documento } = request.query;
                const { Producto, TipoDocumento } = request.models();

                const impuestos = await TipoDocumento.obtenerIdImpuestosPorId(tipo_documento);

                return Producto
                    .buscarProducto(idEmpresa, impuestos, busqueda);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/productos',
        options: {
            validate: {
                payload: {
                    nombre: Joi.string().required(),
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
                    .eager('[tipo_producto.impuestos, unidad_medida]')
                    .insert(producto);
            }
        }
    }
];
