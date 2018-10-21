'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Sucursal extends Schwifty.Model {

    static get tableName() {

        return 'sucursal';
    }

    static get idColumn() {

        return 'id_sucursal';
    }

    static get joiSchema() {

        return Joi.object({
            id_sucursal: Joi.number().required(),
            descripcion: Joi.string().required()
        });
    }

    static buscarSucursalEnEmpresa(idEmpresa, idSucursal) {

        return this
            .query()
            .where('id_empresa', idEmpresa)
            .andWhere('id_sucursal', idSucursal)
            .first();
    }
};
