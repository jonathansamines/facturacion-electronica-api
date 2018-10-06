'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');
const Bcrypt = require('bcryptjs');

const iteracionesSal = 2;

module.exports = class Usuario extends Schwifty.Model {

    static get tableName() {

        return 'usuario';
    }

    static get idColumn() {

        return 'id_usuario';
    }

    static get joiSchema() {

        return Joi.object({
            id_usuario: Joi.number().required(),
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            nombre_usuario: Joi.string().required(),
            correo_electronico: Joi.string().required(),
            password: Joi.string().required(),
            id_empresa: Joi.number().required()
        });
    }

    static registrarUsuario(usuario) {

        const modeloUsuario = {
            ...usuario,
            password: Bcrypt.hash(usuario.password, iteracionesSal)
        };

        return this
            .query()
            .insert(modeloUsuario);
    }

    static obtenerUsuarioPorCredenciales(nombreUsuario, password) {

        return this
            .query()
            .where('nombre_usuario', nombreUsuario)
            .andWhere('password', Bcrypt.hash(password, iteracionesSal))
            .first();
    }
};
