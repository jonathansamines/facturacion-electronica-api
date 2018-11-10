'use strict';

const Boom = require('boom');
const Schmervice = require('schmervice');
const FirmaElectronica = require('./firma-electronica');
const CertificacionElectronica = require('./certificacion-electronica');

module.exports = class ServicioCertificador extends Schmervice.Service {
    async certificarDocumento(documentoEmisor) {

        const certificacion = new CertificacionElectronica(documentoEmisor);

        // Validamos el documento del emisor
        let { valido, errores } = certificacion.validarDocumento();

        if (!valido) {
            const error = Boom.badData('Errores de validación encontrados en el DTE', errores);
            error.output.payload.errors = errores;
            throw error;
        }

        // Si el documento es válido, lo certificamos
        const firma = new FirmaElectronica();

        const nodoACertificar = certificacion.obtenerInformacionACertificar();
        const xmlDatosCertificacionFirmado = await firma.firmarDocumento(nodoACertificar.toString());
        const documentoCertificado = certificacion.certificarDocumento(xmlDatosCertificacionFirmado);

        // Validamos que el documento certificado por el certificador sea válido
        ({ valido, errores } = certificacion.validarDocumento());

        if (!valido) {
            const error = Boom.badData('Errores de validación encontrados en el DTE', errores);
            error.output.payload.errors = errores;
            throw error;
        }

        return {
            documento: documentoCertificado,
            documentoXML: documentoCertificado.toString()
        };
    }
};
