'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class TipoProducto extends Schwifty.Model {

    static get tableName() {

        return 'tipo_producto';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
