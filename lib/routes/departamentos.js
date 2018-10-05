'use strict';

module.exports = {
    method: 'GET',
    path: '/api/departamentos',
    options: {
        handler: (request, h) => {

            const { Departamento } = request.models();

            return Departamento
                .query()
                .eager('municipios');
        }
    }
};
