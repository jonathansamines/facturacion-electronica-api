'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Producto extends Schwifty.Model {

    static get tableName() {

        return 'producto';
    }

    static get idColumn() {

        return 'id_producto';
    }

    static get joiSchema() {

        return Joi.object({
            id_producto: Joi.number().required(),
            descripcion: Joi.string().required(),
            marca: Joi.string().required(),
            precio: Joi.number().required(),
            id_moneda: Joi.string().required(),
            id_tipo_producto: Joi.number.required(),
            id_unidad_medida: Joi.string().required(),
            id_empresa: Joi.number().required()
        });
    }
};
