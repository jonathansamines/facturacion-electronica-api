'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Moneda extends Schwifty.Model {

    static get tableName() {

        return 'moneda';
    }

    static get idColumn() {

        return 'id_moneda';
    }

    static get joiSchema() {

        return Joi.object({
            id_moneda: Joi.string().required(),
            descripcion: Joi.string().required()
        });
    }
};
