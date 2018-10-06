'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

const mapearValorDeColumna = (propiedad, objeto, mapper) =>  {

    return {
        ...objeto,
        [propiedad]: mapper(objeto[propiedad], propiedad)
    };
};

module.exports = class TipoDocumento extends Schwifty.Model {

    static get tableName() {

        return 'tipo_documento';
    }

    static get idColumn() {

        return 'id_tipo_documento';
    }

    static get relationMappings() {

        const TipoFrase = require('./TipoFrase');

        return {
            tipos_frase: {
                relation: Schwifty.Model.ManyToManyRelation,
                modelClass: TipoFrase,
                join: {
                    from: 'tipo_documento.id_tipo_documento',
                    to: 'tipo_frase.id_tipo_frase',
                    through: {
                        from: 'tipo_frase_tipo_documento.id_tipo_documento',
                        to: 'tipo_frase_tipo_documento.id_tipo_frase'
                    }
                }
            }
        };
    }

    static get joiSchema() {

        return Joi.object({
            id_tipo_documento: Joi.string().required(),
            descripcion: Joi.string().required(),
            exportacion: Joi.boolean()
        });
    }

    $parseDatabaseJson(json) {

        return mapearValorDeColumna(
            'exportacion',
            super.$parseDatabaseJson(json),
            (valor) => !!valor
        );
    }
};
