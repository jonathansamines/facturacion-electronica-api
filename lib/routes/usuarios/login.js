'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    method: 'POST',
    path: '/api/usuarios/login',
    options: {
        validate: {
            payload: {
                nombre_usuario: Joi.string().required(),
                password: Joi.string().required()
            }
        },
        handler: async (request, h) => {

            const { nombre_usuario, password } = request.payload;
            const { Usuario } = request.models();

            const usuario = await Usuario.obtenerUsuarioPorCredenciales(nombre_usuario, password);

            if (usuario === undefined) {
                throw Boom.unauthorized('Credenciales de usuario inválidas');
            }

            return usuario;
        }
    }
};
