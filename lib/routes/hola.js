'use strict';

module.exports = {
    method: 'GET',
    path: '/hola',
    options: {
        handler: async (request, h) => ({ hola: '' })
    }
};
