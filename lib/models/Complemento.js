'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Complemento extends Schwifty.Model {

    static get tableName() {

        return 'complemento';
    }

    static get idColumn() {

        return 'id_complemento';
    }

    static get joiSchema() {

        return Joi.object({
            id_complemento: Joi.number().required(),
            descripcion: Joi.string().required(),
            requerido: Joi.boolean()
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
