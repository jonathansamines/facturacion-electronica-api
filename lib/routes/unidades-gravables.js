'use strict';

module.exports = {
    method: 'GET',
    path: '/api/unidades-gravables',
    options: {
        handler: (request, h) => {

            const { UnidadGravable } = request.models();

            return UnidadGravable.query();
        }
    }
};
