'use strict';

exports.seed = async (knex, Promise) => {

    await knex('moneda').del();

    return knex('moneda').insert([
        {
            descripcion: 'Dólar Estadounidense',
            id_moneda: 'USD'
        },
        {
            descripcion: 'Quetzal Guatemalteco',
            id_moneda: 'GTQ'
        }
    ]);
};
