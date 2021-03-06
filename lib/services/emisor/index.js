'use strict';

const Boom = require('boom');
const { flatMap } = require('lodash');
const Schmervice = require('schmervice');
const Impuestos = require('./impuestos');
const FirmaElectronica = require('./firma-electronica');
const DocumentoTributario = require('./documento-tributario-electronico');

module.exports = class ServicioEmisor extends Schmervice.Service {
    calcularDetalleProducto(...args) {

        return Impuestos.calcularDetalleProducto(...args);
    }

    obtenerUnidadGravablesCatalogo(productos) {

        const { UnidadGravable } = this.server.models();
        const claveCompuestaUnidadGravable = flatMap(productos, ((p) => p.impuestos.map((i) => [i.id_impuesto, i.id_unidad_gravable])));

        return UnidadGravable
            .query()
            .eager('impuesto')
            .whereInComposite(
                ['id_impuesto', 'id_unidad_gravable'],
                claveCompuestaUnidadGravable
            );
    }

    async cargarInformacionFactura(idEmpresa, factura) {

        const { Empresa, Moneda, Cliente, Producto, Complemento } = this.server.models();

        const [tipoCambio, moneda, empresa, cliente] = await Promise.all([
            this.server.methods.obtenerTipoDeCambioDelDia(),
            Moneda.query().findById(factura.id_moneda),
            Empresa.query().eager('municipio.departamento').findById(idEmpresa),
            Cliente.buscarClienteEnEmpresaPorId(idEmpresa, factura.id_cliente)
        ]);

        if (moneda === undefined) {
            throw Boom.badRequest('La moneda no existe en el catalogo de monedas');
        }

        if (cliente === undefined) {
            throw Boom.badRequest('El cliente no existe para la empresa actualmente activa');
        }

        const complementosCatalogo = await Complemento.query();
        const productosCatalogo = await Producto.buscarProductosEnCatalogoPorId(idEmpresa, factura.productos.map((producto) => producto.id_producto));
        const unidadesGravablesCatalogo = await this.obtenerUnidadGravablesCatalogo(factura.productos);

        return {
            cliente,
            moneda,
            tipoCambio,
            empresa,
            complementosCatalogo,
            productosCatalogo,
            unidadesGravablesCatalogo
        };
    }

    async crearDocumento(factura, {
        cliente,
        moneda,
        tipoCambio,
        empresa,
        complementosCatalogo,
        productosCatalogo,
        unidadesGravablesCatalogo
    }) {

        const dte = new DocumentoTributario();

        const elementoDatosEmision = dte
            .crearElementoDatosGenerales(factura)
            .crearElementoEmisor(empresa)
            .crearElementoReceptor(factura.id_tipo_documento, cliente)
            .crearElementoFrases(factura.frases)
            .crearElementoItems(tipoCambio, moneda, factura.productos, productosCatalogo, unidadesGravablesCatalogo)
            .crearElementoComplementos(factura.complementos, complementosCatalogo)
            .crear();

        // Certificación del emisor
        const xmlStringDatosEmision = DocumentoTributario.crearDocumento(elementoDatosEmision).toString();

        const firma = new FirmaElectronica();
        const xmlDatosEmisionFirmado = await firma.firmarDocumento(xmlStringDatosEmision);

        const elementoDTE = {
            DTE: {
                ...elementoDatosEmision,
                '@ID': 'DatosCertificados'
            }
        };

        const documento = {
            GTDocumento: {
                '@Version': 0.4,
                '@xmlns:dte': 'http://www.sat.gob.gt/dte/fel/0.1.0',
                '@xmlns:ds': 'http://www.w3.org/2000/09/xmldsig#',
                '@xmlns:cfc': 'http://www.sat.gob.gt/dte/fel/CompCambiaria/0.1.0',
                '@xmlns:cex': 'http://www.sat.gob.gt/face2/ComplementoExportaciones/0.1.0',
                '@xmlns:cfe': 'http://www.sat.gob.gt/face2/ComplementoFacturaEspecial/0.1.0',
                '@xmlns:cno': 'http://www.sat.gob.gt/face2/ComplementoReferenciaNota/0.1.0',
                SAT: [
                    {
                        ...elementoDTE,
                        '@ClaseDocumento': 'dte'
                    }
                ],
                '#raw': xmlDatosEmisionFirmado
            }
        };

        return {
            documento,
            documentoXML: DocumentoTributario.crearDocumento(documento)
        };
    }
};
