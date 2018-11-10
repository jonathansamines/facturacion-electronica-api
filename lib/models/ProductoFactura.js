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

        return Joi.object({
            id_factura: Joi.number().required(),
            cantidad: Joi.number().required(),
            id_unidad_medida: Joi.string().required(),
            id_producto: Joi.number().required(),
            total_impuestos: Joi.number().required(),
            descuento: Joi.number().required(),
            total: Joi.number().required()
        });
    }
};
