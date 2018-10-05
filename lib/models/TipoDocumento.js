'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class TipoDocumento extends Schwifty.Model {

    static get tableName() {

        return 'tipo_documento';
    }

    static get idColumn() {

        return 'id_tipo_documento';
    }

    static get joiSchema() {

        return Joi.object({
            id_tipo_documento: Joi.string().required(),
            descripcion: Joi.string().required()
        });
    }
};
