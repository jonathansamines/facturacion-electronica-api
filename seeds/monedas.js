'use strict';


exports.seed = async (knex, Promise) => {

    await knex('moneda').del();

    return knex('moneda').insert([
        {
            descripcion: 'Dólar Estadounidense',
            codigo: 'USD'
        },
        {
            descripcion: 'Quetzal Guatemalteco',
            codigo: 'GTQ'
        }
    ]);
};
