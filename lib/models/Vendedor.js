'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Vendedor extends Schwifty.Model {

    static get tableName() {

        return 'vendedor';
    }

    static get idColumn() {

        return 'id_vendedor';
    }

    static get joiSchema() {

        return Joi.object({
            id_vendedor: Joi.number().required(),
            nit: Joi.string().required(),
            cui: Joi.string().required(),
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            id_sucursal: Joi.string().required()
        });
    }
};
