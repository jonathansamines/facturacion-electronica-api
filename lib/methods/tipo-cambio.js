'use strict';

const Soap = require('soap');
const { get } = require('lodash');

const wsdlURL = 'http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL';

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
