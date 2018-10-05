'use strict';

exports.seed = async (knex, Promise) => {

    await knex('departamento').del();

    return knex('departamento').insert([
        {
            'id_departamento':'GT-GU',
            'descripcion':'Guatemala'
        },
        {
            'id_departamento':'GT-PR',
            'descripcion':'El Progreso'
        },
        {
            'id_departamento':'GT-SA',
            'descripcion':'Sacatepéquez'
        },
        {
            'id_departamento':'GT-CM',
            'descripcion':'Chimaltenango'
        },
        {
            'id_departamento':'GT-ES',
            'descripcion':'Escuintla'
        },
        {
            'id_departamento':'GT-SR',
            'descripcion':'Santa Rosa'
        },
        {
            'id_departamento':'GT-SO',
            'descripcion':'Sololá'
        },
        {
            'id_departamento':'GT-TO',
            'descripcion':'Totonicapán'
        },
        {
            'id_departamento':'GT-QZ',
            'descripcion':'Quetzaltenango'
        },
        {
            'id_departamento':'GT-SU',
            'descripcion':'Suchitepéquez'
        },
        {
            'id_departamento':'GT-RE',
            'descripcion':'Retalhuleu'
        },
        {
            'id_departamento':'GT-SM',
            'descripcion':'San Marcos'
        },
        {
            'id_departamento':'GT-HU',
            'descripcion':'Huehuetenango'
        },
        {
            'id_departamento':'GT-QC',
            'descripcion':'Quiché'
        },
        {
            'id_departamento':'GT-BV',
            'descripcion':'Baja Verapaz'
        },
        {
            'id_departamento':'GT-AV',
            'descripcion':'Alta Verapaz'
        },
        {
            'id_departamento':'GT-PE',
            'descripcion':'Petén'
        },
        {
            'id_departamento':'GT-IZ',
            'descripcion':'Izabal'
        },
        {
            'id_departamento':'GT-ZA',
            'descripcion':'Zacapa'
        },
        {
            'id_departamento':'GT-CQ',
            'descripcion':'Chiquimula'
        },
        {
            'id_departamento':'GT-JA',
            'descripcion':'Jalapa'
        },
        {
            'id_departamento':'GT-JU',
            'descripcion':'Jutiapa'
        }
    ]);
};
