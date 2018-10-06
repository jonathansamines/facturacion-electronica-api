'use strict';

const Soap = require('soap');
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

        return {
            fecha_consulta: get(respuesta, 'TipoCambioDiaResult.CambioDolar.VarDolar[0].fecha', null),
            tipo_cambio: Number.parseFloat(get(respuesta, 'TipoCambioDiaResult.CambioDolar.VarDolar[0].referencia', null))
        };
    },
    options: {
        cache: {
            expiresIn: 3600 * 1000 * 12, // 12 horas
            generateTimeout: 5000 // 5 segundos
        }
    }
};
