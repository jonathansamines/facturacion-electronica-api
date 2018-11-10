'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Factura extends Schwifty.Model {

    static get tableName() {

        return 'factura';
    }

    static get idColumn() {

        return 'id_factura';
    }

    static get relationMappings() {

        const ProductoFactura = require('./ProductoFactura');

        return {
            productos: {
                modelClass: ProductoFactura,
                relation: Schwifty.Model.HasManyRelation,
                join: {
                    from: 'factura.id_factura',
                    to: 'producto_factura.id_factura'
                }
            }
        };
    }

    static get joiSchema() {

        return Joi.object({
            id_vendedor: Joi.number().required(),
            id_moneda: Joi.string().required(),
            id_cliente: Joi.number().required(),
            id_sucursal: Joi.number().required(),
            id_usuario: Joi.number().required(),
            id_tipo_documento: Joi.string().required(),
            exportacion: Joi.boolean(),
            productos: Joi.array(),
            total: Joi.number().required()
        });
    }
};
