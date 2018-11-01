'use strict';

const Boom = require('boom');
const Builder = require('xmlbuilder');
const Format = require('date-fns/format');
const ParseDate = require('date-fns/parse');
const FlatMap = require('lodash/flatMap');

const crearElementoEmisor = (empresa) => {

    return {
        'DireccionEmisor': [
            {
                Direccion: empresa.direccion,
                Municipio: empresa.municipio.id_municipio,
                Departamento: empresa.municipio.id_departamento,
                Pais: empresa.municipio.departamento.id_pais
            }
        ],
        '@NITEmisor': empresa.nit,
        '@NombreEmisor': empresa.nombre_legal,
        '@CodigoEstablecimiento': empresa.codigo_establecimiento_sat,
        '@NombreComercial': empresa.nombre_comercial,
        '@CorreoEmisor': empresa.correo_electronico,
        '@AfiliacionIVA': empresa.id_afiliacion_iva
    };
};

const crearElementoDatosGenerales = (factura) => {

    return {
        '@Tipo': factura.id_tipo_documento,
        '@FechaHoraEmision': Format(ParseDate(factura.fecha_emision), 'YYYY-mm-DDThh:mm:ss.000-06:00'),
        '@CodigoMoneda': factura.id_moneda,
        '@NumeroAcceso': Math.ceil(Math.random() * 1000000000),
        '@Exp': factura.exportacion ? 'SI' : null
    };
};

const crearElementoReceptor = (tipoDocumento, cliente) => {

    const esDocumentoEspecial = tipoDocumento === 'FESP';

    return {
        'DireccionReceptor': [
            {
                Direccion: cliente.direccion,
                Municipio: cliente.municipio.id_municipio,
                Departamento: cliente.municipio.id_departamento,
                Pais: cliente.municipio.departamento.id_pais
            }
        ],
        '@IDReceptor': esDocumentoEspecial ? cliente.cui : cliente.nit,
        '@TipoEspecial': esDocumentoEspecial ? 'CUI' : null,
        '@NombreReceptor': `${cliente.nombre} ${cliente.apellido}`,
        '@CorreoReceptor': cliente.correo_electronico
    };
};

const crearElementoFrases = (frases) => {

    return {
        Frase: frases.map((frase) => ({
            '@TipoFrase': frase.id_tipo_frase,
            '@CodigoEscenario': frase.codigo_escenario
        }))
    };
};

const buscarImpuestoProductoEnCatalogo = (impuestoProducto, impuestosCatalogo) => {

    const impuesto = impuestosCatalogo.find((impuestoCatalogo) => impuestoProducto.id_impuesto === impuestoCatalogo.id_impuesto && impuestoProducto.id_unidad_gravable === impuestoCatalogo.id_unidad_gravable);

    if (impuesto === undefined) {
        throw Boom.badData('Impuesto asociado al producto no existe en el catálogo de impuestos');
    }

    return Object.assign({}, impuestoProducto, impuesto);
};

const buscarProductoEnCatalogo = (productoFactura, productosCatalogo, impuestosCatalogo) => {

    const producto = productosCatalogo.find((productoCatalogo) => productoCatalogo.id_producto === productoFactura.id_producto);

    if (producto === undefined) {
        throw Boom.badData('Producto no existente en el catálogo de productos', { producto });
    }

    const impuestos = productoFactura.impuestos.map((impuestoProducto) =>  buscarImpuestoProductoEnCatalogo(impuestoProducto, impuestosCatalogo));

    return {
        ...productoFactura,
        ...producto,
        impuestos
    };
};

const crearElementoItems = (productosFactura, productosCatalogo, impuestosCatalogo) => {

    const productos = productosFactura.map((productoFactura) => buscarProductoEnCatalogo(productoFactura, productosCatalogo, impuestosCatalogo));

    return {
        Item: productos.map((producto, index) => ({
            Cantidad: producto.unidades,
            UnidadMedida: producto.id_unidad_medida,
            Descripcion: producto.descripcion,
            PrecioUnitario: producto.precio,
            Descuento: producto.descuento,
            Impuestos: producto.impuestos.map((impuesto) => ({
                NombreCorto: impuesto.nombre_corto,
                CodigoUnidadGravable: impuesto.id_unidad_gravable,
                MontoGravable: producto.precio,
                CantidadUnidadesGravables: producto.unidades,
                MontoImpuesto: impuesto.monto
            })),
            Total: 0,
            ComplementosItem: [],
            '@NumeroLinea': index + 1,
            '@BienOServicio': producto.tipo_producto.categoria
        }))
    };
};

const crearElementoTotales = (totales) => {

    return {
        TotalImpuestos: [
            {
                TotalImpuesto: {
                    '@NombreCorto': 'el impuesto',
                    '@TotalMontoImpuesto': 'totla'
                }
            }
        ],
        GranTotal: [
            5000,
            6000
        ]
    };
};

module.exports = {
    method: 'GET',
    path: '/api/facturas',
    options: {
        handler: async (request, h) => {

            // TODO: Esto vendrá como payload
            const factura = {
                id_moneda: 'GTQ',
                id_cliente: 1,
                id_tipo_documento: 'FACT',
                exportacion: false,
                fecha_emision: new Date().toISOString(),
                frases: [
                    {
                        id_tipo_frase: 1,
                        codigo_escenario: 1
                    }
                ],
                productos: [
                    {
                        unidades: 2,
                        id_producto: 1,
                        impuestos: [
                            {
                                id_impuesto: 1,
                                id_unidad_gravable: 1
                            },
                            {
                                id_impuesto: 1,
                                id_unidad_gravable: 2
                            }
                        ]
                    },
                    {
                        unidades: 15,
                        id_producto: 2,
                        impuestos: [
                            {
                                id_impuesto: 1,
                                id_unidad_gravable: 1
                            },
                            {
                                id_impuesto: 1,
                                id_unidad_gravable: 2
                            }
                        ]
                    }
                ],
                totales: []
            };

            const { id_empresa: idEmpresa } = request.auth.credentials;
            const { Empresa, Cliente, Producto, UnidadGravable } = request.models();

            const empresa = await Empresa.query().eager('municipio.departamento').findById(idEmpresa);
            const cliente = await Cliente.query().eager('municipio.departamento').findById(factura.id_cliente);
            const productosCatalogo = await Producto.buscarProductosEnCatalogoPorId(idEmpresa, factura.productos.map((producto) => producto.id_producto));

            const impuestosCatalogo = await UnidadGravable
                .query()
                .whereInComposite(
                    ['id_impuesto', 'id_unidad_gravable'],
                    FlatMap(factura.productos, ((p) => p.impuestos.map((i) => [i.id_impuesto, i.id_unidad_gravable])))
                );

            const elementoDatosGenerales = crearElementoDatosGenerales(factura);
            const elementoEmisor = crearElementoEmisor(empresa);
            const elementoReceptor = crearElementoReceptor(factura.id_tipo_documento, cliente);
            const elementoFrases = crearElementoFrases(factura.frases);

            const elementoItems = crearElementoItems(factura.productos, productosCatalogo, impuestosCatalogo);
            const elementoTotales = crearElementoTotales(factura.totales);

            const documento = {
                GTDocumento: {
                    '@Version': 0.4,
                    SAT: [
                        {
                            DTE: {
                                DatosEmision: {
                                    DatosGenerales: elementoDatosGenerales,
                                    Emisor: elementoEmisor,
                                    Receptor: elementoReceptor,
                                    Frases: elementoFrases,
                                    Items: elementoItems,
                                    Totales: elementoTotales
                                }
                            }
                        }
                    ]
                }
            };

            const opcionesDocumento = {
                version: '1.0',
                encoding: 'UTF-8',
                standalone: true
            };

            const opcionesId = {
                pubID: null,
                sysID: null
            };

            const opcionesParseo = {
                skipNullNodes: true,
                skipNullAttributes: true
            };

            const xml = Builder.create(documento, opcionesDocumento, opcionesId, opcionesParseo);

            return h.response(xml.toString())
                .type('text/xml');
        }
    }
};
