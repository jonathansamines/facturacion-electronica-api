'use strict';

const Milliseconds = require('milliseconds');

const cookieName = 'SESSION-ID';

module.exports = {
    name: 'session',
    scheme: 'cookie',
    options: {
        cookie: cookieName,
        password: process.env.COOKIE_SECRET,
        isSameSite: false,
        isSecure: process.env.COOKIE_SECURE,
        isHttpOnly: true,
        keepAlive: true,
        ttl: Milliseconds.days(1),
        redirectTo: '/login',
        appendNext: true,
        validateFunc: async (request, session) => {

            const identificador = request.state && request.state[cookieName] && request.state[cookieName].identificador;
            const sesionUsuario = await request.obtenerSesionUsuario(identificador);

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
