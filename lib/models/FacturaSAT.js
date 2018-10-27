'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class FacturaSAT extends Schwifty.Model {

    static get tableName() {

        return 'factura_sat';
    }

    static get idColumn() {

        return 'id_factura_sat';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
