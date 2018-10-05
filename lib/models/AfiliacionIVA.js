'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class AfiliacionIVA extends Schwifty.Model {

    static get tableName() {

        return 'afiliacion_iva';
    }

    static get idColumn() {

        return 'id_afiliacion_iva';
    }

    static get relationMappings() {

        const TipoDocumento = require('./TipoDocumento');

        return {
            tipos_documentos: {
                relation: Schwifty.Model.ManyToManyRelation,
                modelClass: TipoDocumento,
                join: {
                    from: 'afiliacion_iva.id_afiliacion_iva',
                    to: 'tipo_documento.id_tipo_documento',
                    through: {
                        from : 'afiliacion_iva_tipo_documento.id_afiliacion_iva',
                        to: 'afiliacion_iva_tipo_documento.id_tipo_documento'
                    }
                }
            }
        };
    }

    static get joiSchema() {

        return Joi.object({
            id_afiliacion_iva: Joi.number().required(),
            descripcion: Joi.string().required()
        });
    }
};
