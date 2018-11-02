'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class CondicionEntrega extends Schwifty.Model {

    static get tableName() {

        return 'condicion_entrega';
    }

    static get idColumn() {

        return 'id_condicion_entrega';
    }

    static get joiSchema() {

        return Joi.object({
            id_condicion_entrega: Joi.string().required(),
            designacion: Joi.string().required()
        });
    }
};
