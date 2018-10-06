'use strict';

const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/api/usuarios/registrar',
    options: {
        validate: {
            payload: {
                nombre: Joi.string().required(),
                apellido: Joi.string().required(),
                nombre_usuario: Joi.string().required(),
                correo_electronico: Joi.string().required(),
                password: Joi.string().required(),
                id_empresa: Joi.number().required()
            }
        },
        handler: (request, h) => {

            const usuario = request.payload;
            const { Usuario } = request.models();

            return Usuario
                .registrarUsuario(usuario);
        }
    }
};
