'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');
const Bcrypt = require('bcryptjs');

const hashDeRuido = process.env.RUIDO_PASSWORD;

module.exports = class Usuario extends Schwifty.Model {

    static get tableName() {

        return 'usuario';
    }

    static get idColumn() {

        return 'id_usuario';
    }

    static get joiSchema() {

        return Joi.object({
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            nombre_usuario: Joi.string().required(),
            correo_electronico: Joi.string().required(),
            password: Joi.string().required(),
            id_empresa: Joi.number().required()
        });
    }

    static get relationMappings() {

        const Empresa = require('./Empresa');

        return {
            empresa: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: Empresa,
                join: {
                    from: 'usuario.id_empresa',
                    to: 'empresa.id_empresa'
                }
            }
        };
    }

    static async registrarUsuario(usuario) {

        const modeloUsuario = {
            ...usuario,
            password: await Bcrypt.hash(usuario.password, hashDeRuido)
        };

        return this
            .query()
            .insert(modeloUsuario);
    }

    static async verificarUsuarioExistente(idEmpresa, nombreUsuario, correoElectronico) {

        const usuarios = await this
            .query()
            .where('id_empresa', idEmpresa)
            .andWhere((builder) => {

                return builder
                    .where('nombre_usuario', nombreUsuario)
                    .orWhere('correo_electronico', correoElectronico);
            })
            .first();

        return usuarios !== undefined;
    }

    static async obtenerUsuarioPorCredenciales(idEmpresa, nombreUsuario, password) {

        return this
            .query()
            .where('id_empresa', idEmpresa)
            .andWhere((builder) => {

                return builder
                    .where('nombre_usuario', nombreUsuario)
                    .orWhere('correo_electronico', nombreUsuario);
            })
            .andWhere('password', await Bcrypt.hash(password, hashDeRuido))
            .first();
    }

    $parseDatabaseJson(json) {

        const parsed = super.$parseDatabaseJson(json);

        Reflect.deleteProperty(parsed, 'password');

        return parsed;
    }
};
