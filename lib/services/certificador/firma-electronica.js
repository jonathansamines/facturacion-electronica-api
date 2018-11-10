'use strict';

const Fs = require('fs');
const Path = require('path');
const Xadesjs = require('xadesjs');
const WebCrypto = require('node-webcrypto-ossl');

Xadesjs.Application.setEngine('OpenSSL', new WebCrypto());

class FirmaElectronia {
    constructor() {

        this.certificado = this.cargarCertificado();
    }

    cargarCertificado() {

        return Fs.readFileSync(Path.resolve(__dirname, './certificado.crt')).toString('base64');
    }

    generarClavesCriptograficas() {

        const opciones = {
            name: 'RSASSA-PKCS1-v1_5',
            modulusLength: 1024,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: {
                name: 'SHA-256'
            }
        };

        return Xadesjs.Application.crypto.subtle.generateKey(
            opciones,
            false, // determina si la clave es extraible
            ['sign', 'verify']
        );
    }

    async firmarDocumento(documento) {

        const opcionesFirma = {
            name: 'RSASSA-PKCS1-v1_5',
            hash: {
                name: 'SHA-256'
            }
        };

        const claves = await this.generarClavesCriptograficas();

        const documentoXml = Xadesjs.Parse(documento);
        const signedXml = new Xadesjs.SignedXml();

        const firma = await signedXml.Sign(
            opcionesFirma,
            claves.privateKey,
            documentoXml,
            {
                keyValue: claves.publicKey,
                references: [
                    {
                        hash: 'SHA-256',
                        transforms: ['enveloped']
                    }
                ],
                productionPlace: {
                    country: 'Guatemala',
                    state: 'Guatemala',
                    city: 'Guatemala',
                    code: 'GT'
                },
                signingCertificate: this.certificado
            }
        );

        return firma.toString();
    }
}

module.exports = FirmaElectronia;
