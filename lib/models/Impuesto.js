'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Impuesto extends Schwifty.Model {

    static get tableName() {

        return 'impuesto';
    }

    static get idColumn() {

        return 'id_impuesto';
    }

    static get joiSchema() {

        return Joi.object({});
    }

    $parseDatabaseJson(json) {

        const objeto = super.$parseDatabaseJson(json);

        return {
            ...objeto,
            sumar_total_dte: Boolean(objeto.sumar_total_dte),
            mostrar_receptor: Boolean(objeto.mostrar_receptor),
            incluir_monto_gravable: Boolean(objeto.incluir_monto_gravable),
            incluir_codigo_unidad_gravable: Boolean(objeto.incluir_codigo_unidad_gravable),
            incluir_cantidad_unidades_gravables: Boolean(objeto.incluir_cantidad_unidades_gravables),
            incluir_monto_impuesto: Boolean(objeto.incluir_monto_impuesto)
        };
    }
};
