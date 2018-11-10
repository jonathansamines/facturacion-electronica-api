'use strict';

const Builder = require('xmlbuilder');
const RandomInt = require('random-int');
const { format, parse } = require('date-fns');
const { buscarProductoEnCatalogo } = require('./filtros');
const { calcularDetalleProducto } = require('./impuestos');

const FORMATO_FECHA = 'YYYY-MM-DDThh:mm:ss.000-06:00';

const opcionesDocumento = {
    version: '1.0',
    encoding: 'UTF-8'
};

const opcionesId = {
    pubID: null,
    sysID: null
};

const opcionesParseo = {
    skipNullNodes: true,
    skipNullAttributes: true,
    stringify: {
        eleName: (val) => 'dte:' + val
    }
};

class DocumentoTributarioElectronico {
    crearElementoEmisor(empresa) {

        this.elementoEmisor = {
            'DireccionEmisor': [
                {
                    Direccion: empresa.direccion,
                    CodigoPostal: 123,
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

        return this;
    }

    crearElementoDatosGenerales(factura) {

        this.elementoDatosGenerales = {
            '@Tipo': factura.id_tipo_documento,
            '@FechaHoraEmision': format(parse(factura.fecha_emision), FORMATO_FECHA),
            '@CodigoMoneda': factura.id_moneda,
            '@NumeroAcceso': RandomInt(100000000, 999999999),
            '@Exp': factura.exportacion ? 'SI' : null
        };

        return this;
    }

    crearElementoReceptor(tipoDocumento, cliente) {

        const esDocumentoEspecial = tipoDocumento === 'FESP';

        this.elementoReceptor = {
            DireccionReceptor: [
                {
                    Direccion: cliente.direccion,
                    CodigoPostal: 123,
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

        return this;
    }

    crearElementoFrases(frases) {

        this.elementoFrases = {
            Frase: frases.map((frase) => ({
                '@TipoFrase': frase.id_tipo_frase,
                '@CodigoEscenario': frase.codigo_escenario
            }))
        };

        return this;
    }

    crearElementoItems(tipoCambio, moneda, productosFactura, productosCatalogo, unidadesGravablesCatalogo) {

        let total = 0;
        const montoImpuestoTotalPorImpuesto = new Map();

        const items = productosFactura.map((productoEnFactura, index) => {

            const producto = buscarProductoEnCatalogo(productoEnFactura, productosCatalogo, unidadesGravablesCatalogo);
            const { impuestos, precioUnitario, montoGravable } = calcularDetalleProducto({
                tipoCambio,
                moneda,
                producto,
                descuento: productoEnFactura.descuento,
                unidades: productoEnFactura.unidades,
                unidadesGravables: producto.unidadesGravables
            });

            let totalImpuestosAplicables = 0;
            const precio = precioUnitario * producto.unidades;

            const elementoImpuestos = producto.unidadesGravables.map((unidadGravable) => {

                const { montoImpuesto } = impuestos.find((i) => i.unidadGravable.id_impuesto === unidadGravable.id_impuesto && i.unidadGravable.id_unidad_gravable === unidadGravable.id_unidad_gravable);
                const montoImpuestoASumar = unidadGravable.impuesto.sumar_total_dte ? montoImpuesto : 0;

                totalImpuestosAplicables += montoImpuestoASumar;

                if (montoImpuestoTotalPorImpuesto.has(unidadGravable.id_impuesto)) {
                    montoImpuestoTotalPorImpuesto.set(unidadGravable.id_impuesto, montoImpuestoTotalPorImpuesto.get(unidadGravable.id_impuesto) + montoImpuesto);
                }
                else {
                    montoImpuestoTotalPorImpuesto.set(unidadGravable.id_impuesto, montoImpuesto);
                }

                const propiedadCodigoUnidadGravable = (
                    unidadGravable.impuesto.incluir_codigo_unidad_gravable ?
                        { CodigoUnidadGravable: unidadGravable.id_unidad_gravable } :
                        {}
                );

                const propiedadMontoGravable = (
                    unidadGravable.impuesto.incluir_monto_gravable ?
                        { MontoGravable: Number(montoGravable).toFixed(6) } :
                        {}
                );

                const propiedadCantidadUnidadesGravables = (
                    unidadGravable.impuesto.incluir_cantidad_unidades_gravables ?
                        { CantidadUnidadesGravables: Number(producto.unidades).toFixed(6) } :
                        {}
                );

                const propiedadMontoImpuesto = (
                    unidadGravable.impuesto.incluir_monto_impuesto ?
                        { MontoImpuesto: Number(montoImpuesto).toFixed(6) } :
                        {}
                );

                return {
                    NombreCorto: unidadGravable.impuesto.nombre_corto.toUpperCase(),
                    ...propiedadCodigoUnidadGravable,
                    ...propiedadMontoGravable,
                    ...propiedadCantidadUnidadesGravables,
                    ...propiedadMontoImpuesto
                };
            });

            const totalProducto = (precio - producto.descuento) + totalImpuestosAplicables;

            total += totalProducto;

            return {
                Cantidad: Number(producto.unidades).toFixed(6),
                UnidadMedida: producto.id_unidad_medida,
                Descripcion: producto.descripcion,
                PrecioUnitario: Number(precioUnitario).toFixed(6),
                Precio: Number(precio).toFixed(6),
                Descuento: Number(producto.descuento).toFixed(6),
                Impuestos: {
                    Impuesto: elementoImpuestos
                },
                Total: Number(totalProducto).toFixed(6),
                ComplementosItem: [],
                '@NumeroLinea': index + 1,
                '@BienOServicio': producto.tipo_producto.categoria
            };
        });

        const totalImpuestos = Array.from(montoImpuestoTotalPorImpuesto.keys(), (idImpuesto) => {

            const unidadGravable = unidadesGravablesCatalogo.find((i) => i.id_impuesto === idImpuesto);

            return {
                '@NombreCorto': unidadGravable.impuesto.nombre_corto.toUpperCase(),
                '@TotalMontoImpuesto': Number(montoImpuestoTotalPorImpuesto.get(unidadGravable.id_impuesto)).toFixed(6)
            };
        });

        this.elementoItemsYTotales = {
            Items: {
                Item: items
            },
            Totales: {
                TotalImpuestos: {
                    TotalImpuesto: totalImpuestos
                },
                GranTotal: Number(total).toFixed(6)
            }
        };

        return this;
    }

    crear() {

        return {
            DatosEmision: {
                '@ID': 'DatosEmision',
                DatosGenerales: this.elementoDatosGenerales,
                Emisor: this.elementoEmisor,
                Receptor: this.elementoReceptor,
                Frases: this.elementoFrases,
                ...this.elementoItemsYTotales
            }
        };
    }

    static crearDocumento(documento) {

        const xml = Builder.create(documento, opcionesDocumento, opcionesId, opcionesParseo);

        return xml;
    }
}

module.exports = DocumentoTributarioElectronico;
