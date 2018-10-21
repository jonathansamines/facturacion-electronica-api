'use strict';

module.exports = {
    method: 'GET',
    path: '/api/unidades-medida',
    options: {
        handler: (request, h) => {

            const { UnidadMedida } = request.models();

            return UnidadMedida.query();
        }
    }
};
