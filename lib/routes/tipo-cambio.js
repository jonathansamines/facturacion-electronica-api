'use strict';

module.exports = {
    method: 'GET',
    path: '/api/tipo-cambio',
    options: {
        handler: async (request, h) => {

            const tipoCambioDia = await request.server.methods.obtenerTipoDeCambioDelDia();
            const tipoCambio = tipoCambioDia.tipo_cambio;

            return {
                fecha_consulta: tipoCambioDia.fecha_consulta,
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
        }
    }
};
