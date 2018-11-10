'use strict';

const Boom = require('boom');
const Fs = require('fs');
const Path = require('path');
const Joi = require('joi');
const { get } = require('lodash');

const directorioDocumentos = Path.resolve(__dirname, './../../__documentos');

module.exports = [
    {
        method: 'GET',
        path: '/api/facturas',
        options: {
            validate: {
                query: {
                    busqueda: Joi.string(),
                    fecha_emision: Joi.string()
                }
            },
            handler: (request, h) => {

                const { Factura } = request.models();
                const { fecha_emision, busqueda } = request.query;
                const { id_empresa: idEmpresa } = request.auth.credentials;

                return Factura
                    .query()
                    .leftJoin('sucursal', 'factura.id_sucursal', 'sucursal.id_sucursal')
                    .eager('productos')
                    .where('id_empresa', idEmpresa);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/facturas/dte/{idFactura}',
        options: {
            validate: {
                params: {
                    idFactura: Joi.number()
                }
            },
            handler: async (request, h) => {

                const { Factura } = request.models();
                const { idFactura } = request.params;
                const { id_empresa: idEmpresa } = request.auth.credentials;

                const factura = await Factura
                    .query()
                    .leftJoin('sucursal', 'factura.id_sucursal', 'sucursal.id_sucursal')
                    .where('id_empresa', idEmpresa)
                    .andWhere('id_factura', idFactura).first();

                if (factura === undefined) {
                    throw Boom.badRequest('No existe la factura con el identificador proporcionado para la empresa actualmente activa');
                }

                return h
                    .file(`dte-${factura.id_factura}.xml`)
                    .type('text/xml');
            }
        }
    },
    {
        method: 'POST',
        path: '/api/facturas',
        options: {
            handler: async (request, h) => {

                const factura = request.payload;
                const { id_empresa: idEmpresa, id_usuario: idUsuario } = request.auth.credentials;
                const { Factura } = request.models();
                const { servicioEmisor, servicioCertificador } = request.services();

                const modeloFactura = await servicioEmisor.cargarInformacionFactura(idEmpresa, factura);

                const { documentoXML: documentoEmisor, documento: modeloDocumento } = await servicioEmisor.crearDocumento(factura, modeloFactura);
                const { documentoXML: documentoCertificado } = await servicioCertificador.certificarDocumento(documentoEmisor.end());

                const registroFactura = {
                    id_vendedor: factura.id_vendedor,
                    id_moneda: factura.id_moneda,
                    id_cliente: factura.id_cliente,
                    id_sucursal: factura.id_sucursal,
                    id_usuario: idUsuario,
                    id_tipo_documento: factura.id_tipo_documento,
                    exportacion: factura.exportacion,
                    total: get(modeloDocumento, 'GTDocumento.SAT[0].DTE.DatosEmision.Totales.GranTotal', 0),
                    productos: get(modeloDocumento, 'GTDocumento.SAT[0].DTE.DatosEmision.Items.Item', []).map((item) => {

                        const meta = JSON.parse(item['#comment']);

                        return {
                            cantidad: item.Cantidad,
                            id_unidad_medida: item.UnidadMedida,
                            id_producto: meta.idProducto,
                            total_impuestos: meta.totalImpuestos,
                            descuento: item.Descuento,
                            total: item.Precio
                        };
                    })
                };

                const registroFacturaResultado = await Factura.query().insertGraphAndFetch(registroFactura);

                await new Promise((resolve, reject) => {

                    Fs.writeFile(`${directorioDocumentos}/dte-${registroFacturaResultado.id_factura}.xml`, documentoCertificado, (err) => {

                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    });
                });

                return h.response(documentoCertificado)
                    .type('text/xml');
            }
        }
    }
];
