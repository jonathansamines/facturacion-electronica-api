'use strict';

const Felicity = require('felicity');
const Empresa = require('./../lib/models/Empresa');

exports.seed = async (knex, Promise) => {

    // const EmpresaGenerator = Felicity.forEntity(Empresa.joiSchema());
    // const generator = new EmpresaGenerator();

    // await knex('empresa').del();

    // return knex('empresa').insert([
    //     {
    //         ...generator.example(),
    //         id_afiliacion_iva
    //     },
    //     generator.example()
    // ]);
};
