'use strict';

const Uuid = require('uuid/v4');
const Milliseconds = require('milliseconds');

const internals = {
    cache: null,
    nombrePropiedadSesion: 'identificador',
    nombreSegmento: 'session',
    getCache: (server) => {

        internals.cache = (
            internals.cache || server.cache({
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

            return () => {

                const cache = internals.getCache(request.server);

                return cache.get(internals.nombrePropiedadSesion);
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

                await cache.set(internals.nombrePropiedadSesion, { usuario });

                request.cookieAuth.set({ identificador });

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

            return async () => {

                const cache = internals.getCache(request.server);
                const options = request.server.auth.lookup(request.route);

                await cache.drop(request.state && request.state[options.cookie][internals.nombrePropiedadSesion]);

                request.cookieAuth.clear();

                return cache;
            };
        },
        options: {
            apply: true
        }
    }
];
