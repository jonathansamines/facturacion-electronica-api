'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Frase extends Schwifty.Model {

    static get tableName() {

        return 'frase';
    }

    static get idColumn() {

        return 'id_frase';
    }

    static get joiSchema() {

        return Joi.object({
            id_frase: Joi.number().required(),
            descripcion: Joi.string().required(),
            codigo_escenario: Joi.number().required()
        });
    }
};
