'use strict';

module.exports = {
    method: 'POST',
    path: '/api/facturas',
    options: {
        handler: async (request, h) => {

            const factura = request.payload;
            const { id_empresa: idEmpresa, id_usuario: idUsuario } = request.auth.credentials;
            const { Factura } = request.models();
            const { servicioEmisor, servicioCertificador } = request.services();

            const documentoEmisor = await servicioEmisor.crearDocumento(idEmpresa, factura);
            const documentoCertificado = await servicioCertificador.certificarDocumento(documentoEmisor);

            const facturaDb = {
                id_vendedor: factura.id_vendedor,
                id_cliente: factura.id_cliente,
                id_sucursal: factura.id_sucursal,
                id_usuario: idUsuario,
                id_tipo_documento: factura.id_tipo_documento,
                fecha_creacion: new Date(),
                exportacion: factura.exportacion,
                factura_sat: {
                    firma_emisor: null,
                    firma_certificador: null,
                    fecha_certificacion: null
                },
                productos: [
                    {
                        cantidad: 0,
                        impuestos: 0,
                        descuento: 0
                    }
                ]
            };

            // await Factura.query().insert(factura);

            return h.response(documentoCertificado)
                .type('text/xml');
        }
    }
};
