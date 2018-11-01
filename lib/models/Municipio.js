'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Municipio extends Schwifty.Model {

    static get tableName() {

        return 'municipio';
    }

    static get idColumn() {

        return 'id_municipio';
    }

    static get relationMappings() {

        const Departamento = require('./Departamento');

        return {
            departamento: {
                modelClass: Departamento,
                relation: Schwifty.Model.HasOneRelation,
                join: {
                    from: 'municipio.id_departamento',
                    to: 'departamento.id_departamento'
                }
            }
        };
    }

    static get joiSchema() {

        return Joi.object({
            id_municipio: Joi.string().required(),
            descripcion: Joi.string().required()
        });
    }
};
