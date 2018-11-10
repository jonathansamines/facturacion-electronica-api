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

const URIComplementos = {
    1: 'http://www.sat.gob.gt/face2/ComplementoExportaciones/0.1.0',
    2: 'http://www.sat.gob.gt/face2/ComplementoFacturaEspecial/0.1.0',
    3: 'http://www.sat.gob.gt/dte/fel/CompCambiaria/0.1.0',
    4: 'http://www.sat.gob.gt/face2/ComplementoReferenciaNota/0.1.0'
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

    crearXmlComplemento({ datos, id_complemento }) {

        // Exportacion
        if (id_complemento === 1) {
            const opcionesParseo = {
                stringify: {
                    eleName: (val) => 'cex:' + val
                }
            };

            return DocumentoTributarioElectronico.crearDocumento({
                Exportacion: {
                    NombreConsignatarioODestinatario: datos.nombre_consignatario,
                    DireccionConsignatarioODestinatario: datos.direccion_consignatario,
                    CodigoConsignatarioODestinatario: datos.codigo_consignatario,
                    NombreComprador: datos.nombre_comprador,
                    DireccionComprador: datos.direccion_comprador,
                    CodigoComprador: datos.codigo_comprador,
                    OtraReferencia: datos.otra_referencia,
                    INCOTERM: datos.condicion_entrega,
                    NombreExportador: datos.nombre_exportador,
                    CodigoExportador: datos.codigo_exportador,
                    '@Version': '1'
                }
            }, opcionesParseo).toString();
        }

        // retenciones factura especial
        if (id_complemento === 2) {
            const opcionesParseo = {
                stringify: {
                    eleName: (val) => 'cfe:' + val
                }
            };

            return DocumentoTributarioElectronico.crearDocumento({
                RetencionesFacturaEspecial: {
                    RetencionISR: datos.retencion_isr,
                    RetencionIVA: datos.retencion_iva,
                    TotalMenosRetenciones: datos.total_menos_retenciones,
                    '@Version': '1'
                }
            }, opcionesParseo).toString();
        }

        // abonos factura cambiaria
        if (id_complemento === 3) {
            const opcionesParseo = {
                stringify: {
                    eleName: (val) => 'cfc:' + val
                }
            };

            return DocumentoTributarioElectronico.crearDocumento({
                AbonosFacturaCambiaria: {
                    Abono: datos.abono,
                    NumeroAbono: datos.numero_abono,
                    FechaVencimiento: datos.fecha_vencimiento,
                    MontoAbono: datos.monto_abono,
                    '@Version': '1'
                }
            }, opcionesParseo).toString();
        }

        // referencias notas
        if (id_complemento === 4) {
            const opcionesParseo = {
                stringify: {
                    eleName: (val) => 'cfc:' + val
                }
            };

            const atributoRegimen = datos.regimen === 'FACE1' ? { '@RegimenAntiguo': 'Antiguo' } : {};

            return DocumentoTributarioElectronico.crearDocumento({
                ReferenciasNota: {
                    '@Version': datos.version,
                    ...atributoRegimen,
                    '@NumeroAutorizacionDocumentoOrigen': datos.numero_autorizacion,
                    '@FechaEmisionDocumentoOrigen': datos.fecha_emision,
                    '@MotivoAjuste': datos.motivo_ajuste,
                    '@SerieDocumentoOrigen': datos.numero_serie,
                    '@NumeroDocumentoOrigen': datos.numero_documento
                }
            }, opcionesParseo).toString();
        }
    }

    crearElementoComplementos(complementos, complementosCatalogo) {

        if (complementos.length === 0) {
            this.elementoComplementos = null;

            return this;
        }

        this.elementoComplementos = {
            Complemento: complementos.map((complemento) => {

                const complementoCatalogo = complementosCatalogo.find((c) => c.id_complemento === complemento.id_complemento);

                return {
                    '@IDComplemento': complementoCatalogo.id_complemento,
                    '@NombreComplemento': complementoCatalogo.descripcion,
                    '@URIComplemento': URIComplementos[complemento.id_complemento],
                    '#raw': this.crearXmlComplemento(complemento, complementoCatalogo)
                };
            })
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
                ...this.elementoItemsYTotales,
                Complementos: this.elementoComplementos
            }
        };
    }

    static crearDocumento(documento, overridesParseo) {

        const xml = Builder.create(documento, opcionesDocumento, opcionesId, Object.assign({}, opcionesParseo, overridesParseo));

        return xml;
    }
}

module.exports = DocumentoTributarioElectronico;
