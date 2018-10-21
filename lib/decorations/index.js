'use strict';

const Uuid = require('uuid/v4');
const Milliseconds = require('milliseconds');

const internals = {
    cache: null,
    nombreSegmento: 'session',
    nombreCache: 'session',
    getCache: (server) => {

        internals.cache = (
            internals.cache || server.cache({
                cache: internals.nombreCache,
                segment: internals.nombreSegmento,
                expiresIn: Milliseconds.days(1)
            })
        );

        return internals.cache;
    }
};

module.exports = [
    {
        type: 'request',
        property: 'obtenerSesionUsuario',
        method: (request) => {

            return (identificador) => {

                const cache = internals.getCache(request.server);

                return cache.get(identificador);
            };
        },
        options: {
            apply: true
        }
    },
    {
        type: 'request',
        property: 'crearSesionUsuario',
        method: (request) => {

            return async (usuario) => {

                const identificador = Uuid();
                const cache = internals.getCache(request.server);

                await cache.set(identificador, { usuario });

                request.cookieAuth.set({ identificador });

                return usuario;

            };
        },
        options: {
            apply: true
        }
    },
    {
        type: 'request',
        property: 'eliminarSesionUsuario',
        method: (request) => {

            return async (identificador) => {

                const cache = internals.getCache(request.server);

                await cache.drop(identificador);

                request.cookieAuth.clear();

                return cache;
            };
        },
        options: {
            apply: true
        }
    }
];
