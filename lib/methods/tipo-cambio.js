'use strict';

const Soap = require('soap');
const Milliseconds = require('milliseconds');
const { get } = require('lodash');

const wsdlURL = 'http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL';

// TODO: posiblemente necesitemos el tipo de cambio del día anterior
// Aclaración: La SAT validará el monto del impuesto cuando la moneda sea diferente a dólares americanos (USD), contra el tipo de cambio oficial publicado por el Banco de Guatemala para esa moneda en el día anterior a la fecha de emisión del documento. Literal C, Art. 21, del Decreto número 1701 Ley Orgánica del Instituto Guatemalteco de Turismo.

module.exports = {
    name: 'obtenerTipoDeCambioDelDia',

    /**
     * Obtiene el tipo de cambio del día
     *
     * @see http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx
     */
    method: async () => {

        const cliente = await Soap.createClientAsync(wsdlURL);
        const [respuesta] = await cliente.TipoCambioDiaAsync();

        const fechaConsulta = get(respuesta, 'TipoCambioDiaResult.CambioDolar.VarDolar[0].fecha', null);
        const tipoCambio = Number.parseFloat(get(respuesta, 'TipoCambioDiaResult.CambioDolar.VarDolar[0].referencia', null));

        return {
            fecha_consulta: fechaConsulta,
            tasa_cambio: [
                {
                    origen: 'USD',
                    destino: 'GTQ',
                    valor: Number.parseFloat(tipoCambio)
                },
                {
                    origen: 'GTQ',
                    destino: 'USD',
                    valor: Number.parseFloat((1 / tipoCambio).toFixed(5))
                }
            ]
        };
    },
    options: {
        cache: {
            expiresIn: Milliseconds.hours(12),
            generateTimeout: Milliseconds.seconds(5)
        }
    }
};
