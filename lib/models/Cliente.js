'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Cliente extends Schwifty.Model {

    static get tableName() {

        return 'cliente';
    }

    static get idColumn() {

        return 'id_cliente';
    }

    static get joiSchema() {

        return Joi.object({
            id_cliente: Joi.number().required(),
            nit: Joi.string().required(),
            cui: Joi.string().required(),
            direccion: Joi.string().required(),
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            id_municipio: Joi.string().required()
        });
    }
};
