'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class UnidadGravable extends Schwifty.Model {

    static get tableName() {

        return 'unidad_gravable';
    }

    static get idColumn() {

        return 'id_unidad_gravable';
    }

    static get joiSchema() {

        return Joi.object({
            tipo_valor: Joi.string().required(),
            valor: Joi.number().required(),
            nombre: Joi.string().required(),
            nombre_corto: Joi.string().required(),
            id_impuesto: Joi.number().required(),
            id_moneda: Joi.number().required()
        });
    }

    static get relationMappings() {

        const Impuesto = require('./Impuesto');

        return {
            impuesto: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: Impuesto,
                join: {
                    from: 'unidad_gravable.id_impuesto',
                    to: 'impuesto.id_impuesto'
                }
            }
        };
    }

    $parseDatabaseJson(json) {

        const objeto = super.$parseDatabaseJson(json);

        return {
            ...objeto,
            exportacion: Boolean(objeto.exportacion)
        };
    }

    static obtenerUnidadesGravablesPorImpuestos(impuestos = []) {

        return this
            .query()
            .whereIn('id_impuesto', impuestos);
    }
};
