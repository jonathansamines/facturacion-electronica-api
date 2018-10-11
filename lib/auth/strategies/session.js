'use strict';

const Milliseconds = require('milliseconds');

module.exports = {
    name: 'session',
    scheme: 'cookie',
    options: {
        cookie: 'SESSION-ID',
        password: process.env.COOKIE_SECRET,
        isSameSite: 'Lax',
        isSecure: process.env.COOKIE_SECURE,
        isHttpOnly: true,
        keepAlive: true,
        ttl: Milliseconds.days(1),
        redirectTo: '/login',
        appendNext: true,
        validateFunc: async (request, session) => {

            const sesionUsuario = await request.obtenerSesionUsuario();

            if (!!sesionUsuario) {
                return {
                    valid: true,
                    credentials: sesionUsuario.usuario
                };
            }

            return {
                valid: false
            };
        }
    }
};
