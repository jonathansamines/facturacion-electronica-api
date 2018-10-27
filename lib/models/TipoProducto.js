'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class TipoProducto extends Schwifty.Model {

    static get tableName() {

        return 'tipo_producto';
    }

    static get idColumn() {

        return 'id_tipo_producto';
    }

    static get joiSchema() {

        return Joi.object({
            id_tipo_producto: Joi.number().required(),
            descripcion: Joi.string().required()
        });
    }

    static get relationMappings() {

        const Impuesto = require('./Impuesto');

        return {
            impuestos: {
                relation: Schwifty.Model.ManyToManyRelation,
                modelClass: Impuesto,
                join: {
                    from: 'tipo_producto.id_tipo_producto',
                    to: 'impuesto.id_impuesto',
                    through: {
                        from : 'impuesto_tipo_producto.id_tipo_producto',
                        to: 'impuesto_tipo_producto.id_impuesto'
                    }
                }
            }
        };
    }
};
