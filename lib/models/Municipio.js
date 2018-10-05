'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Municipio extends Schwifty.Model {

    static get tableName() {

        return 'municipio';
    }

    static get idColumn() {

        return 'id_municipio';
    }

    static get joiSchema() {

        return Joi.object({
            id_municipio: Joi.string().required(),
            descripcion: Joi.string().required()
        });
    }
};
