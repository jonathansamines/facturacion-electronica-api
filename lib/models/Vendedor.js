'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Vendedor extends Schwifty.Model {

    static get tableName() {

        return 'vendedor';
    }

    static get idColumn() {

        return 'id_vendedor';
    }

    static get joiSchema() {

        return Joi.object({
            id_vendedor: Joi.number().required(),
            nit: Joi.string().required(),
            cui: Joi.string().required(),
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            id_sucursal: Joi.string().required()
        });
    }

    static get relationMappings() {

        const Sucursal = require('./Sucursal');

        return {
            sucursal: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: Sucursal,
                join: {
                    from: 'vendedor.id_sucursal',
                    to: 'sucursal.id_sucursal'
                }
            }
        };
    }

    static buscarVendedor(idEmpresa, busqueda) {

        const terminoBusqueda = `%${busqueda}%`;

        return this
            .query()
            .eager('sucursal')
            .leftJoin('sucursal', 'vendedor.id_sucursal', 'sucursal.id_sucursal')
            .where('sucursal.id_empresa', idEmpresa)
            .andWhere((builder) => {

                return builder
                    .where('nombre', 'like', terminoBusqueda)
                    .orWhere('apellido', 'like', terminoBusqueda)
                    .orWhere('nit', 'like', terminoBusqueda)
                    .orWhere('cui', 'like', terminoBusqueda);
            });
    }
};
