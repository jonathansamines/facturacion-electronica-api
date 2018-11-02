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
        const Impuesto = require('./Impuesto');
        const Complemento = require('./Complemento');

        return {
            complementos: {
                relation: Schwifty.Model.ManyToManyRelation,
                modelClass: Complemento,
                join: {
                    from: 'tipo_documento.id_tipo_documento',
                    to: 'complemento.id_complemento',
                    through: {
                        extra: ['requerido'],
                        from: 'complemento_tipo_documento.id_tipo_documento',
                        to: 'complemento_tipo_documento.id_complemento'
                    }
                }
            },
            tipos_frase: {
                relation: Schwifty.Model.ManyToManyRelation,
                modelClass: TipoFrase,
                join: {
                    from: 'tipo_documento.id_tipo_documento',
                    to: 'tipo_frase.id_tipo_frase',
                    through: {
                        extra: ['requerido'],
                        from: 'tipo_frase_tipo_documento.id_tipo_documento',
                        to: 'tipo_frase_tipo_documento.id_tipo_frase'
                    }
                }
            },
            impuestos: {
                relation: Schwifty.Model.ManyToManyRelation,
                modelClass: Impuesto,
                join: {
                    from: 'tipo_documento.id_tipo_documento',
                    to: 'impuesto.id_impuesto',
                    through: {
                        from: 'impuesto_tipo_documento.id_tipo_documento',
                        to: 'impuesto_tipo_documento.id_impuesto'
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

        const objeto = super.$parseDatabaseJson(json);

        return {
            ...objeto,
            exportacion: Boolean(objeto.exportacion)
        };
    }
};
