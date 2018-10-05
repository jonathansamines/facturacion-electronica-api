'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Empresa extends Schwifty.Model {

    static get tableName() {

        return 'empresa';
    }

    static get idColumn() {

        return 'id_empresa';
    }

    static get relationMappings() {

        const Sucursal = require('./Sucursal');

        return {
            sucursales: {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: Sucursal,
                join: {
                    from: 'empresa.id_empresa',
                    to: 'sucursal.id_empresa'
                }
            }
        };
    }

    static get joiSchema() {

        return Joi.object({
            id_empresa: Joi.number().required(),
            descripcion: Joi.string().required(),
            nombre_legal: Joi.string().required(),
            nombre_comercial: Joi.string().required(),
            nit: Joi.string().required(),
            cui: Joi.string().required(),
            direccion: Joi.string().required(),
            id_afiliacion_iva: Joi.number().required(),
            id_municipio: Joi.number().required()
        });
    }
};
