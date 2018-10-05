'use strict';

exports.seed = async (knex, Promise) => {

    await knex('tipo_documento').del();

    return knex('tipo_documento').insert([
        {
            descripcion: 'Factura',
            codigo: 'FACT'
        },
        {
            descripcion: 'Factura Cambiaria',
            codigo: 'FCAM'
        },
        {
            descripcion: 'Factura Pequeño Contribuyente',
            codigo: 'FPEQ'
        },
        {
            descripcion: 'Factura Cambiaria Pequeño Contribuyente',
            codigo: 'FCAP'
        },
        {
            descripcion: 'Factura Especial',
            codigo: 'FESP'
        },
        {
            descripcion: 'Nota de Abono',
            codigo: 'NABN'
        },
        {
            descripcion: 'Recibo por Donación',
            codigo: 'RDON'
        },
        {
            descripcion: 'Recibo',
            codigo: 'RECI'
        },
        {
            descripcion: 'Nota de Débito',
            codigo: 'NDEB'
        },{
            descripcion: 'Nota de Crédito',
            codigo: 'NCRE'
        }
    ]);
};
