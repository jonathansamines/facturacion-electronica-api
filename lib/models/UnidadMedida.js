'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class UnidadMedida extends Schwifty.Model {

    static get tableName() {

        return 'unidad_medida';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
