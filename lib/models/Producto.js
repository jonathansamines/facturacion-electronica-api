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
            id_tipo_producto: Joi.number().required(),
            id_unidad_medida: Joi.string().required(),
            id_empresa: Joi.number().required()
        });
    }

    static get relationMappings() {

        const UnidadMedida = require('./UnidadMedida');

        return {
            unidad_medida: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: UnidadMedida,
                join: {
                    from: 'producto.id_unidad_medida',
                    to: 'unidad_medida.id_unidad_medida'
                }
            }
        };
    }

    static buscarProducto(idEmpresa, busqueda) {

        const terminoBusqueda = `%${busqueda}%`;

        return this
            .query()
            .eager('unidad_medida')
            .leftJoin('tipo_producto', 'producto.id_tipo_producto', 'tipo_producto.id_tipo_producto')
            .where('id_empresa', idEmpresa)
            .andWhere((builder) => {

                return builder
                    .where('producto.descripcion', 'like', terminoBusqueda)
                    .orWhere('producto.marca', 'like', terminoBusqueda)
                    .orWhere('tipo_producto.descripcion', 'like', terminoBusqueda);
            });
    }
};
