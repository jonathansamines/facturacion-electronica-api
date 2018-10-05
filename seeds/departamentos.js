'use strict';

exports.seed = async (knex, Promise) => {

    await knex('departamento').del();

    return knex('departamento').insert([
        {
            'codigo':'GT-GU',
            'descripcion':'Guatemala'
        },
        {
            'codigo':'GT-PR',
            'descripcion':'El Progreso'
        },
        {
            'codigo':'GT-SA',
            'descripcion':'Sacatepéquez'
        },
        {
            'codigo':'GT-CM',
            'descripcion':'Chimaltenango'
        },
        {
            'codigo':'GT-ES',
            'descripcion':'Escuintla'
        },
        {
            'codigo':'GT-SR',
            'descripcion':'Santa Rosa'
        },
        {
            'codigo':'GT-SO',
            'descripcion':'Sololá'
        },
        {
            'codigo':'GT-TO',
            'descripcion':'Totonicapán'
        },
        {
            'codigo':'GT-QZ',
            'descripcion':'Quetzaltenango'
        },
        {
            'codigo':'GT-SU',
            'descripcion':'Suchitepéquez'
        },
        {
            'codigo':'GT-RE',
            'descripcion':'Retalhuleu'
        },
        {
            'codigo':'GT-SM',
            'descripcion':'San Marcos'
        },
        {
            'codigo':'GT-HU',
            'descripcion':'Huehuetenango'
        },
        {
            'codigo':'GT-QC',
            'descripcion':'Quiché'
        },
        {
            'codigo':'GT-BV',
            'descripcion':'Baja Verapaz'
        },
        {
            'codigo':'GT-AV',
            'descripcion':'Alta Verapaz'
        },
        {
            'codigo':'GT-PE',
            'descripcion':'Petén'
        },
        {
            'codigo':'GT-IZ',
            'descripcion':'Izabal'
        },
        {
            'codigo':'GT-ZA',
            'descripcion':'Zacapa'
        },
        {
            'codigo':'GT-CQ',
            'descripcion':'Chiquimula'
        },
        {
            'codigo':'GT-JA',
            'descripcion':'Jalapa'
        },
        {
            'codigo':'GT-JU',
            'descripcion':'Jutiapa'
        }
    ]);
};
