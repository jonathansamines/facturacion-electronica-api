'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = [
    {
        method: 'POST',
        path: '/api/usuarios/login',
        options: {
            auth: {
                mode: 'try'
            },
            validate: {
                payload: {
                    nombre_usuario: Joi.string().required(),
                    password: Joi.string().required(),
                    id_empresa: Joi.number().required()
                }
            },
            handler: async (request, h) => {

                // TODO: Redirigir al home de la aplicación frontend
                if (request.auth.isAuthenticated) {
                    return h.redirect('/');
                }

                const { id_empresa, nombre_usuario, password } = request.payload;
                const { Usuario } = request.models();

                const usuario = await Usuario.obtenerUsuarioPorCredenciales(
                    id_empresa,
                    nombre_usuario,
                    password
                );

                if (usuario === undefined) {
                    throw Boom.unauthorized('Credenciales de usuario inválidas');
                }

                await request.crearSesionUsuario(usuario);

                return request.obtenerSesionUsuario();
            }
        }
    },
    {
        method: 'POST',
        path: '/api/usuarios/registrar',
        options: {
            auth: {
                mode: 'try'
            },
            validate: {
                payload: {
                    nombre: Joi.string().required(),
                    apellido: Joi.string().required(),
                    nombre_usuario: Joi.string().required(),
                    correo_electronico: Joi.string().required(),
                    password: Joi.string().min(12).required(),
                    id_empresa: Joi.number().required()
                }
            },
            handler: async (request, h) => {

                const usuario = request.payload;
                const { Usuario } = request.models();

                const usuarioExistente = await Usuario.verificarUsuarioExistente(
                    usuario.id_empresa,
                    usuario.nombre_usuario,
                    usuario.correo_electronico
                );

                if (usuarioExistente) {
                    throw Boom.badRequest('Usuario ya está registrado en la empresa');
                }

                return Usuario
                    .registrarUsuario(usuario);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/usuarios/logout',
        options: {
            handler: async (request, h) => {

                await request.eliminarSesionUsuario();

                // TODO: Redirect to login page
                return h.redirect('/');
            }
        }
    }
];
