'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

const depurarNIT = (nit = '') => {

    let depurado = nit.replace(/[\s]+/ig, ''); // eliminamos espacios en blanco

    // si el contenido tiene uno más caracteres diferentes a .
    // eliminamos todos los puntos
    if (depurado.search(/[\dA-Za-z]+/ig) !== -1) {
        depurado = depurado.replace(/[.]+/ig, '');
    }

    if (depurado !== '.') {
        depurado = depurado.replace(/[.]+/ig, '');
    }

    depurado = (
        (
            depurado.startsWith('-', depurado.length - 2) ||
            depurado.startsWith('_', depurado.length - 2)
        ) ?
            depurado.substring(0, depurado.length - 2) + depurado.substring(depurado.length - 1, depurado.length) :
            depurado
    );

    depurado = depurado.replace(/k$/ig, 'K');


    if (depurado.toUpperCase() === 'C/F' || depurado.toUpperCase() === 'CONSUMIDORFINAL') {
        return 'CF';
    }


    return depurado;
};

const depurarCUI = (cui = '') => {

    const coincidencias = cui.match(/[0-9]+/gi);

    if (coincidencias === null) {
        return cui;
    }

    return coincidencias.join('');
};

module.exports = class Cliente extends Schwifty.Model {

    static get tableName() {

        return 'cliente';
    }

    static get idColumn() {

        return 'id_cliente';
    }

    static get joiSchema() {

        return Joi.object({
            nit: Joi.string().required(),
            cui: Joi.string().required(),
            direccion: Joi.string().required(),
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            id_municipio: Joi.string().required(),
            id_empresa: Joi.number().required(),
            correo_electronico: Joi.string().allow('')
        });
    }

    static get relationMappings() {

        const Municipio = require('./Municipio');

        return {
            municipio: {
                relation: Schwifty.Model.HasOneRelation,
                modelClass: Municipio,
                join: {
                    from: 'cliente.id_municipio',
                    to: 'municipio.id_municipio'
                }
            }
        };
    }

    static buscarCliente(idEmpresa, busqueda) {

        const terminoBusqueda = (termino) => `%${termino}%`;

        return this
            .query()
            .where((builder) => builder.where('id_empresa', idEmpresa))
            .andWhere((builder) => {

                return builder
                    .where('nombre', 'like', terminoBusqueda(busqueda))
                    .orWhere('apellido', 'like', terminoBusqueda(busqueda))
                    .orWhere('nit', 'like', terminoBusqueda(depurarNIT(busqueda)))
                    .orWhere('cui', 'like', terminoBusqueda(depurarCUI(busqueda)));
            });
    }

    static buscarClienteEnEmpresaPorId(idEmpresa, idCliente) {

        return this
            .query()
            .eager('municipio.departamento')
            .where('id_empresa', idEmpresa)
            .andWhere('id_cliente', idCliente)
            .first();
    }
};
