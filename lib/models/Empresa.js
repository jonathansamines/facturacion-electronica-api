'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Empresa extends Schwifty.Model {

    static get tableName() {

        return 'empresa';
    }

    static get idColumn() {

        return 'id_empresa';
    }

    static get joiSchema() {

        return Joi.object({
            id_empresa: Joi.number().required(),
            descripcion: Joi.string().required()
        });
    }
};
