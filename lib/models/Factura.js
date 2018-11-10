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
        const FacturaSAT = require('./FacturaSAT');

        return {
            factura_sat: {
                modelClass: FacturaSAT,
                relation: Schwifty.Model.HasOneRelation,
                join: {
                    from: 'factura.id_factura_sat',
                    to: 'factura_sat.id_factura_sat'
                }
            },
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

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
