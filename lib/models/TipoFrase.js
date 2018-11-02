'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class TipoFrase extends Schwifty.Model {

    static get tableName() {

        return 'tipo_frase';
    }

    static get idColumn() {

        return 'id_tipo_frase';
    }

    static get relationMappings() {

        const Frase = require('./Frase');

        return {
            frases: {
                relation: Schwifty.Model.HasManyRelation,
                modelClass: Frase,
                join: {
                    from: 'tipo_frase.id_tipo_frase',
                    to: 'frase.id_tipo_frase'
                }
            }
        };
    }

    static get joiSchema() {

        return Joi.object({
            id_tipo_frase: Joi.number().required(),
            descripcion: Joi.string().required()
        });
    }

    $parseDatabaseJson(json) {

        const objeto = super.$parseDatabaseJson(json);

        return {
            ...objeto,
            requerido: Boolean(objeto.requerido)
        };
    }
};
