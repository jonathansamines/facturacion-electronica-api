'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class ProductoFactura extends Schwifty.Model {

    static get tableName() {

        return 'producto_factura';
    }

    static get idColumn() {

        return ['id_producto', 'id_factura'];
    }

    static get joiSchema() {

        return Joi.object({});
    }
};
