'use strict';

const Fs = require('fs');
const Path = require('path');
const Xml = require('libxmljs');
const Uuid = require('uuid/v4');
const { format } = require('date-fns');

const esquemaGlobal = Xml.parseXml(Fs.readFileSync(Path.resolve(__dirname, './esquemas/GT_Documento-0.1.0.xsd.xml')));

const FORMATO_FECHA = 'YYYY-MM-DDThh:mm:ss.000-06:00';
const NS_DOCUMENTO = 'http://www.sat.gob.gt/dte/fel/0.1.0';
const NS_XMLSIG = 'http://www.w3.org/2000/09/xmldsig';

class CertificacionElectronica {
    constructor(documentoEmisor) {

        this.documentoEmisor = documentoEmisor;
        this.documento = Xml.parseXmlString(documentoEmisor);
        this.certificador = {
            nit: '80100108',
            nombre: 'Certificador Anónimo SA'
        };
    }

    obtenerInformacionACertificar() {

        return this.documento.get('xmlns:SAT/xmlns:DTE', NS_DOCUMENTO);
    }

    validarDocumento() {

        const documentoXml = Xml.parseXml(this.documento.toString());

        return {
            valido: documentoXml.validate(esquemaGlobal),
            errores: documentoXml.validationErrors.map((e) => ({ message: e.message, ...e }))
        };
    }

    crearAutorizacion() {

        const autorizacion = Uuid().toUpperCase();

        return {
            autorizacion,
            serie: autorizacion.substr(0, 8),
            numero: Number.parseInt(autorizacion.replace(/[-]/ig, '').substring(9, 16), 16),
            fecha: format(new Date(), FORMATO_FECHA)
        };
    }

    certificarDocumento(xmlDatosCertificacionFirmado) {

        // Agregamos el namespace the firmas criptograficas
        this.documento.root().attr('xmlns:ds', NS_XMLSIG);

        // Certificación del certificador
        const { autorizacion, serie, numero, fecha } = this.crearAutorizacion();

        const elementoDTE = this.documento.get('xmlns:SAT/xmlns:DTE', NS_DOCUMENTO);
        const nodoCertificacion = elementoDTE.node('dte:Certificacion');

        nodoCertificacion.node('dte:NITCertificador', this.certificador.nit);
        nodoCertificacion.node('dte:NombreCertificador', this.certificador.nombre);
        nodoCertificacion.node('dte:NumeroAutorizacion').attr('Serie', serie).attr('Numero', numero).text(autorizacion);
        nodoCertificacion.node('dte:FechaHoraCertificacion', fecha);

        const documentoCertificacion = Xml.parseXmlString(xmlDatosCertificacionFirmado);
        const nodoFirma = documentoCertificacion.root();

        this.documento.root().addChild(nodoFirma);

        return this.documento;
    }
}

module.exports = CertificacionElectronica;
