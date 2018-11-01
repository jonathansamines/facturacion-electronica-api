'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Pais extends Schwifty.Model {

    static get tableName() {

        return 'pais';
    }

    static get idColumn() {

        return 'id_pais';
    }

    static get joiSchema() {

        return Joi.object({
            id_pais: Joi.string().required(),
            descripcion: Joi.string().required()
        });
    }
};
