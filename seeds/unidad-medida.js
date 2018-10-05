'use strict';

/**
 * Unidades de medida tomadas de SAT-IA-008
 *
 * @param {*} knex
 * @param {*} Promise
 */
exports.seed = async (knex, Promise) => {

    await knex('unidad_medida').del();

    return knex('unidad_medida').insert([
        {
            descripcion: 'Metros',
            id_unidad_medida: 'MTS'
        },
        {
            descripcion: 'Metros Cuadrados',
            id_unidad_medida: 'MT2'
        },
        {
            descripcion: 'Metros Cúbicos',
            id_unidad_medida: 'MT3'
        },
        {
            descripcion: 'Kilogramo',
            id_unidad_medida: 'KGS'
        },
        {
            descripcion: 'Par',
            id_unidad_medida: 'PAR'
        },
        {
            descripcion: 'Cabeza',
            id_unidad_medida: 'CBZ'
        },
        {
            descripcion: 'Pieza',
            id_unidad_medida: 'PZA'
        },
        {
            descripcion: 'Juego',
            id_unidad_medida: 'JGO'
        },
        {
            descripcion: 'Barril',
            id_unidad_medida: 'BAR'
        }
    ]);
};
