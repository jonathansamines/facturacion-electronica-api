'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Departamento extends Schwifty.Model {

    static get tableName() {

        return 'departamento';
    }

    static get idColumn() {

        return 'id_departamento';
    }

    static get relationMappings() {

        const Municipio = require('./Municipio');

        return {
            municipios: {
                modelClass: Municipio,
                relation: Schwifty.Model.HasManyRelation,
                join: {
                    from: 'departamento.id_departamento',
                    to: 'municipio.id_departamento'
                }
            }
        };
    }

    static get joiSchema() {

        return Joi.object({
            id_departamento: Joi.string().required(),
            descripcion: Joi.string().required(),
            codigo: Joi.string().required()
        });
    }
};
