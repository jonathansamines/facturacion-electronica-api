'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class TipoFrase extends Schwifty.Model {

    static get tableName() {

        return 'tipo_frase';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
