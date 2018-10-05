'use strict';

exports.seed = async (knex, Promise) => {

    await knex('municipio').del();

    return knex('municipio').insert([
        {
            'codigo':'0101',
            'descripcion':'Guatemala',
            'id_departamento':1
        },
        {
            'codigo':'0102',
            'descripcion':'Santa Catarina Pinula',
            'id_departamento':1
        },
        {
            'codigo':'0103',
            'descripcion':'San José Pinula',
            'id_departamento':1
        },
        {
            'codigo':'0104',
            'descripcion':'San José del Golfo',
            'id_departamento':1
        },
        {
            'codigo':'0105',
            'descripcion':'Palencia',
            'id_departamento':1
        },
        {
            'codigo':'0106',
            'descripcion':'Chinautla',
            'id_departamento':1
        },
        {
            'codigo':'0107',
            'descripcion':'San Pedro Ayampuc',
            'id_departamento':1
        },
        {
            'codigo':'0108',
            'descripcion':'Mixco',
            'id_departamento':1
        },
        {
            'codigo':'0109',
            'descripcion':'San Pedro Sacatepéquez',
            'id_departamento':1
        },
        {
            'codigo':'0110',
            'descripcion':'San Juan Sacatepéquez',
            'id_departamento':1
        },
        {
            'codigo':'0111',
            'descripcion':'San Raymundo',
            'id_departamento':1
        },
        {
            'codigo':'0112',
            'descripcion':'Chuarrancho',
            'id_departamento':1
        },
        {
            'codigo':'0113',
            'descripcion':'Fraijanes',
            'id_departamento':1
        },
        {
            'codigo':'0114',
            'descripcion':'Amatitlán',
            'id_departamento':1
        },
        {
            'codigo':'0115',
            'descripcion':'Villa Nueva',
            'id_departamento':1
        },
        {
            'codigo':'0116',
            'descripcion':'Villa Canales',
            'id_departamento':1
        },
        {
            'codigo':'0117',
            'descripcion':'Petapa',
            'id_departamento':1
        },
        {
            'codigo':'0201',
            'descripcion':'Guastatoya',
            'id_departamento':2
        },
        {
            'codigo':'0202',
            'descripcion':'Morazán',
            'id_departamento':2
        },
        {
            'codigo':'0203',
            'descripcion':'San Agustín Acasaguastlán',
            'id_departamento':2
        },
        {
            'codigo':'0204',
            'descripcion':'San Cristóbal Acasaguastlán',
            'id_departamento':2
        },
        {
            'codigo':'0205',
            'descripcion':'El Jícaro',
            'id_departamento':2
        },
        {
            'codigo':'0206',
            'descripcion':'Sansare',
            'id_departamento':2
        },
        {
            'codigo':'0207',
            'descripcion':'Sanarate',
            'id_departamento':2
        },
        {
            'codigo':'0208',
            'descripcion':'San Antonio la Paz',
            'id_departamento':2
        },
        {
            'codigo':'0301',
            'descripcion':'Antigua Guatemala',
            'id_departamento':3
        },
        {
            'codigo':'0302',
            'descripcion':'Jocotenango',
            'id_departamento':3
        },
        {
            'codigo':'0303',
            'descripcion':'Pastores',
            'id_departamento':3
        },
        {
            'codigo':'0304',
            'descripcion':'Sumpango',
            'id_departamento':3
        },
        {
            'codigo':'0305',
            'descripcion':'Santo Domingo Xenacoj',
            'id_departamento':3
        },
        {
            'codigo':'0306',
            'descripcion':'Santiago Sacatepéquez',
            'id_departamento':3
        },
        {
            'codigo':'0307',
            'descripcion':'San Bartolomé Milpas Altas',
            'id_departamento':3
        },
        {
            'codigo':'0308',
            'descripcion':'San Lucas Sacatepéquez',
            'id_departamento':3
        },
        {
            'codigo':'0309',
            'descripcion':'Santa Lucía Milpas Altas',
            'id_departamento':3
        },
        {
            'codigo':'0310',
            'descripcion':'Magdalena Milpas Altas',
            'id_departamento':3
        },
        {
            'codigo':'0311',
            'descripcion':'Santa María de Jesús',
            'id_departamento':3
        },
        {
            'codigo':'0312',
            'descripcion':'Ciudad Vieja',
            'id_departamento':3
        },
        {
            'codigo':'0313',
            'descripcion':'San Miguel Dueñas',
            'id_departamento':3
        },
        {
            'codigo':'0314',
            'descripcion':'Alotenango',
            'id_departamento':3
        },
        {
            'codigo':'0315',
            'descripcion':'San Antonio Aguas Calientes',
            'id_departamento':3
        },
        {
            'codigo':'0316',
            'descripcion':'Santa Catarina Barahona',
            'id_departamento':3
        },
        {
            'codigo':'0401',
            'descripcion':'Chimaltenango',
            'id_departamento':4
        },
        {
            'codigo':'0402',
            'descripcion':'San José Poaquil',
            'id_departamento':4
        },
        {
            'codigo':'0403',
            'descripcion':'San Martín Jilotepeque',
            'id_departamento':4
        },
        {
            'codigo':'0404',
            'descripcion':'Comalapa',
            'id_departamento':4
        },
        {
            'codigo':'0405',
            'descripcion':'Santa Apolonia',
            'id_departamento':4
        },
        {
            'codigo':'0406',
            'descripcion':'Tecpán Guatemala',
            'id_departamento':4
        },
        {
            'codigo':'0407',
            'descripcion':'Patzún',
            'id_departamento':4
        },
        {
            'codigo':'0408',
            'descripcion':'Pochuta',
            'id_departamento':4
        },
        {
            'codigo':'0409',
            'descripcion':'Patzicía',
            'id_departamento':4
        },
        {
            'codigo':'0410',
            'descripcion':'Santa Cruz Balanyá',
            'id_departamento':4
        },
        {
            'codigo':'0411',
            'descripcion':'Acatenango',
            'id_departamento':4
        },
        {
            'codigo':'0412',
            'descripcion':'Yepocapa',
            'id_departamento':4
        },
        {
            'codigo':'0413',
            'descripcion':'San Andrés Itzapa',
            'id_departamento':4
        },
        {
            'codigo':'0414',
            'descripcion':'Parramos',
            'id_departamento':4
        },
        {
            'codigo':'0415',
            'descripcion':'Zaragoza',
            'id_departamento':4
        },
        {
            'codigo':'0416',
            'descripcion':'El Tejar',
            'id_departamento':4
        },
        {
            'codigo':'0501',
            'descripcion':'Escuintla',
            'id_departamento':5
        },
        {
            'codigo':'0502',
            'descripcion':'Santa Lucía Cotzumalguapa',
            'id_departamento':5
        },
        {
            'codigo':'0503',
            'descripcion':'La Democracia',
            'id_departamento':5
        },
        {
            'codigo':'0504',
            'descripcion':'Siquinalá',
            'id_departamento':5
        },
        {
            'codigo':'0505',
            'descripcion':'Masagua',
            'id_departamento':5
        },
        {
            'codigo':'0506',
            'descripcion':'Tiquisate',
            'id_departamento':5
        },
        {
            'codigo':'0507',
            'descripcion':'La Gomera',
            'id_departamento':5
        },
        {
            'codigo':'0508',
            'descripcion':'Guanagazapa',
            'id_departamento':5
        },
        {
            'codigo':'0509',
            'descripcion':'San José',
            'id_departamento':5
        },
        {
            'codigo':'0510',
            'descripcion':'Iztapa',
            'id_departamento':5
        },
        {
            'codigo':'0511',
            'descripcion':'Palín',
            'id_departamento':5
        },
        {
            'codigo':'0512',
            'descripcion':'San Vicente Pacaya',
            'id_departamento':5
        },
        {
            'codigo':'0513',
            'descripcion':'Nueva Concepción',
            'id_departamento':5
        },
        {
            'codigo':'0601',
            'descripcion':'Cuilapa',
            'id_departamento':6
        },
        {
            'codigo':'0602',
            'descripcion':'Barberena',
            'id_departamento':6
        },
        {
            'codigo':'0603',
            'descripcion':'Santa Rosa de Lima',
            'id_departamento':6
        },
        {
            'codigo':'0604',
            'descripcion':'Casillas',
            'id_departamento':6
        },
        {
            'codigo':'0605',
            'descripcion':'San Rafael las Flores',
            'id_departamento':6
        },
        {
            'codigo':'0606',
            'descripcion':'Oratorio',
            'id_departamento':6
        },
        {
            'codigo':'0607',
            'descripcion':'San Juan Tecuaco',
            'id_departamento':6
        },
        {
            'codigo':'0608',
            'descripcion':'Chiquimulilla',
            'id_departamento':6
        },
        {
            'codigo':'0609',
            'descripcion':'Taxisco',
            'id_departamento':6
        },
        {
            'codigo':'0610',
            'descripcion':'Santa María Ixhuatán',
            'id_departamento':6
        },
        {
            'codigo':'0611',
            'descripcion':'Guazacapán',
            'id_departamento':6
        },
        {
            'codigo':'0612',
            'descripcion':'Santa Cruz Naranjo',
            'id_departamento':6
        },
        {
            'codigo':'0613',
            'descripcion':'Pueblo Nuevo Viñas',
            'id_departamento':6
        },
        {
            'codigo':'0614',
            'descripcion':'Nueva Santa Rosa',
            'id_departamento':6
        },
        {
            'codigo':'0701',
            'descripcion':'Sololá',
            'id_departamento':7
        },
        {
            'codigo':'0702',
            'descripcion':'San José Chacayá',
            'id_departamento':7
        },
        {
            'codigo':'0703',
            'descripcion':'Santa María Visitación',
            'id_departamento':7
        },
        {
            'codigo':'0704',
            'descripcion':'Santa Lucía Utatlán',
            'id_departamento':7
        },
        {
            'codigo':'0705',
            'descripcion':'Nahualá',
            'id_departamento':7
        },
        {
            'codigo':'0706',
            'descripcion':'Santa Catarina Ixtahuacán',
            'id_departamento':7
        },
        {
            'codigo':'0707',
            'descripcion':'Santa Clara la Laguna',
            'id_departamento':7
        },
        {
            'codigo':'0708',
            'descripcion':'Concepción',
            'id_departamento':7
        },
        {
            'codigo':'0709',
            'descripcion':'San Andrés Semetabaj',
            'id_departamento':7
        },
        {
            'codigo':'0710',
            'descripcion':'Panajachel',
            'id_departamento':7
        },
        {
            'codigo':'0711',
            'descripcion':'Santa Catarina Palopó',
            'id_departamento':7
        },
        {
            'codigo':'0712',
            'descripcion':'San Antonio Palopó',
            'id_departamento':7
        },
        {
            'codigo':'0713',
            'descripcion':'San Lucas Tolimán',
            'id_departamento':7
        },
        {
            'codigo':'0714',
            'descripcion':'Santa Cruz la Laguna',
            'id_departamento':7
        },
        {
            'codigo':'0715',
            'descripcion':'San Pablo la Laguna',
            'id_departamento':7
        },
        {
            'codigo':'0716',
            'descripcion':'San Marcos la Laguna',
            'id_departamento':7
        },
        {
            'codigo':'0717',
            'descripcion':'San Juan la Laguna',
            'id_departamento':7
        },
        {
            'codigo':'0718',
            'descripcion':'San Pedro la Laguna',
            'id_departamento':7
        },
        {
            'codigo':'0719',
            'descripcion':'Santiago Atitlán',
            'id_departamento':7
        },
        {
            'codigo':'0801',
            'descripcion':'Totonicapán',
            'id_departamento':8
        },
        {
            'codigo':'0802',
            'descripcion':'San Cristóbal Totonicapán',
            'id_departamento':8
        },
        {
            'codigo':'0803',
            'descripcion':'San Francisco el Alto',
            'id_departamento':8
        },
        {
            'codigo':'0804',
            'descripcion':'San Andrés Xecul',
            'id_departamento':8
        },
        {
            'codigo':'0805',
            'descripcion':'Momostenango',
            'id_departamento':8
        },
        {
            'codigo':'0806',
            'descripcion':'Santa María Chiquimula',
            'id_departamento':8
        },
        {
            'codigo':'0807',
            'descripcion':'Santa Lucía la Reforma',
            'id_departamento':8
        },
        {
            'codigo':'0808',
            'descripcion':'San Bartolo',
            'id_departamento':8
        },
        {
            'codigo':'0901',
            'descripcion':'Quetzaltenango',
            'id_departamento':9
        },
        {
            'codigo':'0902',
            'descripcion':'Salcajá',
            'id_departamento':9
        },
        {
            'codigo':'0903',
            'descripcion':'Olintepeque',
            'id_departamento':9
        },
        {
            'codigo':'0904',
            'descripcion':'San Carlos Sija',
            'id_departamento':9
        },
        {
            'codigo':'0905',
            'descripcion':'Sibilia',
            'id_departamento':9
        },
        {
            'codigo':'0906',
            'descripcion':'Cabricán',
            'id_departamento':9
        },
        {
            'codigo':'0907',
            'descripcion':'Cajolá',
            'id_departamento':9
        },
        {
            'codigo':'0908',
            'descripcion':'San Miguel Siguilá',
            'id_departamento':9
        },
        {
            'codigo':'0909',
            'descripcion':'Ostuncalco',
            'id_departamento':9
        },
        {
            'codigo':'0910',
            'descripcion':'San Mateo',
            'id_departamento':9
        },
        {
            'codigo':'0911',
            'descripcion':'Concepción Chiquirichapa',
            'id_departamento':9
        },
        {
            'codigo':'0912',
            'descripcion':'San Martín Sacatepéquez',
            'id_departamento':9
        },
        {
            'codigo':'0913',
            'descripcion':'Almolonga',
            'id_departamento':9
        },
        {
            'codigo':'0914',
            'descripcion':'Cantel',
            'id_departamento':9
        },
        {
            'codigo':'0915',
            'descripcion':'Huitán',
            'id_departamento':9
        },
        {
            'codigo':'0916',
            'descripcion':'Zunil',
            'id_departamento':9
        },
        {
            'codigo':'0917',
            'descripcion':'Colomba',
            'id_departamento':9
        },
        {
            'codigo':'0918',
            'descripcion':'San Francisco la Unión',
            'id_departamento':9
        },
        {
            'codigo':'0919',
            'descripcion':'El Palmar',
            'id_departamento':9
        },
        {
            'codigo':'0920',
            'descripcion':'Coatepeque',
            'id_departamento':9
        },
        {
            'codigo':'0921',
            'descripcion':'Génova',
            'id_departamento':9
        },
        {
            'codigo':'0922',
            'descripcion':'Flores Costa Cuca',
            'id_departamento':9
        },
        {
            'codigo':'0923',
            'descripcion':'La Esperanza',
            'id_departamento':9
        },
        {
            'codigo':'0924',
            'descripcion':'Palestina de los Altos',
            'id_departamento':9
        },
        {
            'codigo':'1001',
            'descripcion':'Mazatenango',
            'id_departamento':10
        },
        {
            'codigo':'1002',
            'descripcion':'Cuyotenango',
            'id_departamento':10
        },
        {
            'codigo':'1003',
            'descripcion':'San Francisco Zapotitlán',
            'id_departamento':10
        },
        {
            'codigo':'1004',
            'descripcion':'San Bernardino',
            'id_departamento':10
        },
        {
            'codigo':'1005',
            'descripcion':'San José el Idolo',
            'id_departamento':10
        },
        {
            'codigo':'1006',
            'descripcion':'Santo Domingo Suchitepéquez',
            'id_departamento':10
        },
        {
            'codigo':'1007',
            'descripcion':'San Lorenzo',
            'id_departamento':10
        },
        {
            'codigo':'1008',
            'descripcion':'Samayac',
            'id_departamento':10
        },
        {
            'codigo':'1009',
            'descripcion':'San Pablo Jocopilas',
            'id_departamento':10
        },
        {
            'codigo':'1010',
            'descripcion':'San Antonio Suchitepéquez',
            'id_departamento':10
        },
        {
            'codigo':'1011',
            'descripcion':'San Miguel Panán',
            'id_departamento':10
        },
        {
            'codigo':'1012',
            'descripcion':'San Gabriel',
            'id_departamento':10
        },
        {
            'codigo':'1013',
            'descripcion':'Chicacao',
            'id_departamento':10
        },
        {
            'codigo':'1014',
            'descripcion':'Patulul',
            'id_departamento':10
        },
        {
            'codigo':'1015',
            'descripcion':'Santa Bárbara',
            'id_departamento':10
        },
        {
            'codigo':'1016',
            'descripcion':'San Juan Bautista',
            'id_departamento':10
        },
        {
            'codigo':'1017',
            'descripcion':'Santo Tomás la Unión',
            'id_departamento':10
        },
        {
            'codigo':'1018',
            'descripcion':'Zunilito',
            'id_departamento':10
        },
        {
            'codigo':'1019',
            'descripcion':'Pueblo Nuevo',
            'id_departamento':10
        },
        {
            'codigo':'1020',
            'descripcion':'Río Bravo',
            'id_departamento':10
        },
        {
            'codigo':'1021',
            'descripcion':'San José La Máquina',
            'id_departamento':10
        },
        {
            'codigo':'1101',
            'descripcion':'Retalhuleu',
            'id_departamento':11
        },
        {
            'codigo':'1102',
            'descripcion':'San Sebastián',
            'id_departamento':11
        },
        {
            'codigo':'1103',
            'descripcion':'Santa Cruz Muluá',
            'id_departamento':11
        },
        {
            'codigo':'1104',
            'descripcion':'San Martín Zapotitlán',
            'id_departamento':11
        },
        {
            'codigo':'1105',
            'descripcion':'San Felipe',
            'id_departamento':11
        },
        {
            'codigo':'1106',
            'descripcion':'San Andrés Villa Seca',
            'id_departamento':11
        },
        {
            'codigo':'1107',
            'descripcion':'Champerico',
            'id_departamento':11
        },
        {
            'codigo':'1108',
            'descripcion':'Nuevo San Carlos',
            'id_departamento':11
        },
        {
            'codigo':'1109',
            'descripcion':'El Asintal',
            'id_departamento':11
        },
        {
            'codigo':'1201',
            'descripcion':'San Marcos',
            'id_departamento':12
        },
        {
            'codigo':'1202',
            'descripcion':'San Pedro Sacatepéquez',
            'id_departamento':12
        },
        {
            'codigo':'1203',
            'descripcion':'San Antonio Sacatepéquez',
            'id_departamento':12
        },
        {
            'codigo':'1204',
            'descripcion':'Comitancillo',
            'id_departamento':12
        },
        {
            'codigo':'1205',
            'descripcion':'San Miguel Ixtahuacán',
            'id_departamento':12
        },
        {
            'codigo':'1206',
            'descripcion':'Concepción Tutuapa',
            'id_departamento':12
        },
        {
            'codigo':'1207',
            'descripcion':'Tacaná',
            'id_departamento':12
        },
        {
            'codigo':'1208',
            'descripcion':'Sibinal',
            'id_departamento':12
        },
        {
            'codigo':'1209',
            'descripcion':'Tajumulco',
            'id_departamento':12
        },
        {
            'codigo':'1210',
            'descripcion':'Tejutla',
            'id_departamento':12
        },
        {
            'codigo':'1211',
            'descripcion':'San Rafael Pié de la Cuesta',
            'id_departamento':12
        },
        {
            'codigo':'1212',
            'descripcion':'Nuevo Progreso',
            'id_departamento':12
        },
        {
            'codigo':'1213',
            'descripcion':'El Tumbador',
            'id_departamento':12
        },
        {
            'codigo':'1214',
            'descripcion':'El Rodeo',
            'id_departamento':12
        },
        {
            'codigo':'1215',
            'descripcion':'Malacatán',
            'id_departamento':12
        },
        {
            'codigo':'1216',
            'descripcion':'Catarina',
            'id_departamento':12
        },
        {
            'codigo':'1217',
            'descripcion':'Ayutla',
            'id_departamento':12
        },
        {
            'codigo':'1218',
            'descripcion':'Ocós',
            'id_departamento':12
        },
        {
            'codigo':'1219',
            'descripcion':'San Pablo',
            'id_departamento':12
        },
        {
            'codigo':'1220',
            'descripcion':'El Quetzal',
            'id_departamento':12
        },
        {
            'codigo':'1221',
            'descripcion':'La Reforma',
            'id_departamento':12
        },
        {
            'codigo':'1222',
            'descripcion':'Pajapita',
            'id_departamento':12
        },
        {
            'codigo':'1223',
            'descripcion':'Ixchiguán',
            'id_departamento':12
        },
        {
            'codigo':'1224',
            'descripcion':'San José Ojetenán',
            'id_departamento':12
        },
        {
            'codigo':'1225',
            'descripcion':'San Cristóbal Cucho',
            'id_departamento':12
        },
        {
            'codigo':'1226',
            'descripcion':'Sipacapa',
            'id_departamento':12
        },
        {
            'codigo':'1227',
            'descripcion':'Esquipulas Palo Gordo',
            'id_departamento':12
        },
        {
            'codigo':'1228',
            'descripcion':'Río Blanco',
            'id_departamento':12
        },
        {
            'codigo':'1229',
            'descripcion':'San Lorenzo',
            'id_departamento':12
        },
        {
            'codigo':'1230',
            'descripcion':'La Blanca',
            'id_departamento':12
        },
        {
            'codigo':'1301',
            'descripcion':'Huehuetenango',
            'id_departamento':13
        },
        {
            'codigo':'1302',
            'descripcion':'Chiantla',
            'id_departamento':13
        },
        {
            'codigo':'1303',
            'descripcion':'Malacatancito',
            'id_departamento':13
        },
        {
            'codigo':'1304',
            'descripcion':'Cuilco',
            'id_departamento':13
        },
        {
            'codigo':'1305',
            'descripcion':'Nentón',
            'id_departamento':13
        },
        {
            'codigo':'1306',
            'descripcion':'San Pedro Necta',
            'id_departamento':13
        },
        {
            'codigo':'1307',
            'descripcion':'Jacaltenango',
            'id_departamento':13
        },
        {
            'codigo':'1308',
            'descripcion':'Soloma',
            'id_departamento':13
        },
        {
            'codigo':'1309',
            'descripcion':'Ixtahuacán',
            'id_departamento':13
        },
        {
            'codigo':'1310',
            'descripcion':'Santa Bárbara',
            'id_departamento':13
        },
        {
            'codigo':'1311',
            'descripcion':'La Libertad',
            'id_departamento':13
        },
        {
            'codigo':'1312',
            'descripcion':'La Democracia',
            'id_departamento':13
        },
        {
            'codigo':'1313',
            'descripcion':'San Miguel Acatán',
            'id_departamento':13
        },
        {
            'codigo':'1314',
            'descripcion':'San Rafael la Independencia',
            'id_departamento':13
        },
        {
            'codigo':'1315',
            'descripcion':'Todos Santos Cuchumatán',
            'id_departamento':13
        },
        {
            'codigo':'1316',
            'descripcion':'San Juan Atitán',
            'id_departamento':13
        },
        {
            'codigo':'1317',
            'descripcion':'Santa Eulalia',
            'id_departamento':13
        },
        {
            'codigo':'1318',
            'descripcion':'San Mateo Ixtatán',
            'id_departamento':13
        },
        {
            'codigo':'1319',
            'descripcion':'Colotenango',
            'id_departamento':13
        },
        {
            'codigo':'1320',
            'descripcion':'San Sebastián Huehuetenango',
            'id_departamento':13
        },
        {
            'codigo':'1321',
            'descripcion':'Tectitán',
            'id_departamento':13
        },
        {
            'codigo':'1322',
            'descripcion':'Concepción Huista',
            'id_departamento':13
        },
        {
            'codigo':'1323',
            'descripcion':'San Juan Ixcoy',
            'id_departamento':13
        },
        {
            'codigo':'1324',
            'descripcion':'San Antonio Huista',
            'id_departamento':13
        },
        {
            'codigo':'1325',
            'descripcion':'San Sebastián Coatán',
            'id_departamento':13
        },
        {
            'codigo':'1326',
            'descripcion':'Barillas',
            'id_departamento':13
        },
        {
            'codigo':'1327',
            'descripcion':'Aguacatán',
            'id_departamento':13
        },
        {
            'codigo':'1328',
            'descripcion':'San Rafael Petzal',
            'id_departamento':13
        },
        {
            'codigo':'1329',
            'descripcion':'San Gaspar Ixchil',
            'id_departamento':13
        },
        {
            'codigo':'1330',
            'descripcion':'Santiago Chimaltenango',
            'id_departamento':13
        },
        {
            'codigo':'1331',
            'descripcion':'Santa Ana Huista',
            'id_departamento':13
        },
        {
            'codigo':'1332',
            'descripcion':'Unión Cantinil',
            'id_departamento':13
        },
        {
            'codigo':'1401',
            'descripcion':'Santa Cruz del Quiché',
            'id_departamento':14
        },
        {
            'codigo':'1402',
            'descripcion':'Chiché',
            'id_departamento':14
        },
        {
            'codigo':'1403',
            'descripcion':'Chinique',
            'id_departamento':14
        },
        {
            'codigo':'1404',
            'descripcion':'Zacualpa',
            'id_departamento':14
        },
        {
            'codigo':'1405',
            'descripcion':'Chajul',
            'id_departamento':14
        },
        {
            'codigo':'1406',
            'descripcion':'Chichicastenango',
            'id_departamento':14
        },
        {
            'codigo':'1407',
            'descripcion':'Patzité',
            'id_departamento':14
        },
        {
            'codigo':'1408',
            'descripcion':'San Antonio Ilotenango',
            'id_departamento':14
        },
        {
            'codigo':'1409',
            'descripcion':'San Pedro Jocopilas',
            'id_departamento':14
        },
        {
            'codigo':'1410',
            'descripcion':'Cunén',
            'id_departamento':14
        },
        {
            'codigo':'1411',
            'descripcion':'San Juan Cotzal',
            'id_departamento':14
        },
        {
            'codigo':'1412',
            'descripcion':'Joyabaj',
            'id_departamento':14
        },
        {
            'codigo':'1413',
            'descripcion':'Nebaj',
            'id_departamento':14
        },
        {
            'codigo':'1414',
            'descripcion':'San Andrés Sajcabajá',
            'id_departamento':14
        },
        {
            'codigo':'1415',
            'descripcion':'Uspantán',
            'id_departamento':14
        },
        {
            'codigo':'1416',
            'descripcion':'Sacapulas',
            'id_departamento':14
        },
        {
            'codigo':'1417',
            'descripcion':'San Bartolomé Jocotenango',
            'id_departamento':14
        },
        {
            'codigo':'1418',
            'descripcion':'Canillá',
            'id_departamento':14
        },
        {
            'codigo':'1419',
            'descripcion':'Chicamán',
            'id_departamento':14
        },
        {
            'codigo':'1420',
            'descripcion':'Ixcán',
            'id_departamento':14
        },
        {
            'codigo':'1421',
            'descripcion':'Pachalum',
            'id_departamento':14
        },
        {
            'codigo':'1501',
            'descripcion':'Salamá',
            'id_departamento':15
        },
        {
            'codigo':'1502',
            'descripcion':'San Miguel Chicaj',
            'id_departamento':15
        },
        {
            'codigo':'1503',
            'descripcion':'Rabinal',
            'id_departamento':15
        },
        {
            'codigo':'1504',
            'descripcion':'Cubulco',
            'id_departamento':15
        },
        {
            'codigo':'1505',
            'descripcion':'Granados',
            'id_departamento':15
        },
        {
            'codigo':'1506',
            'descripcion':'El Chol',
            'id_departamento':15
        },
        {
            'codigo':'1507',
            'descripcion':'San Jerónimo',
            'id_departamento':15
        },
        {
            'codigo':'1508',
            'descripcion':'Purulhá',
            'id_departamento':15
        },
        {
            'codigo':'1601',
            'descripcion':'Cobán',
            'id_departamento':16
        },
        {
            'codigo':'1602',
            'descripcion':'Santa Cruz Verapaz',
            'id_departamento':16
        },
        {
            'codigo':'1603',
            'descripcion':'San Cristóbal Verapaz',
            'id_departamento':16
        },
        {
            'codigo':'1604',
            'descripcion':'Tactic',
            'id_departamento':16
        },
        {
            'codigo':'1605',
            'descripcion':'Tamahú',
            'id_departamento':16
        },
        {
            'codigo':'1606',
            'descripcion':'Tucurú',
            'id_departamento':16
        },
        {
            'codigo':'1607',
            'descripcion':'Panzós',
            'id_departamento':16
        },
        {
            'codigo':'1608',
            'descripcion':'Senahú',
            'id_departamento':16
        },
        {
            'codigo':'1609',
            'descripcion':'San Pedro Carchá',
            'id_departamento':16
        },
        {
            'codigo':'1610',
            'descripcion':'San Juan Chamelco',
            'id_departamento':16
        },
        {
            'codigo':'1611',
            'descripcion':'Lanquín',
            'id_departamento':16
        },
        {
            'codigo':'1612',
            'descripcion':'Cahabón',
            'id_departamento':16
        },
        {
            'codigo':'1613',
            'descripcion':'Chisec',
            'id_departamento':16
        },
        {
            'codigo':'1614',
            'descripcion':'Chahal',
            'id_departamento':16
        },
        {
            'codigo':'1615',
            'descripcion':'Fray Bartolomé de las Casas',
            'id_departamento':16
        },
        {
            'codigo':'1616',
            'descripcion':'Santa Catalina la Tinta',
            'id_departamento':16
        },
        {
            'codigo':'1617',
            'descripcion':'Raxruhá',
            'id_departamento':16
        },
        {
            'codigo':'1701',
            'descripcion':'Flores',
            'id_departamento':17
        },
        {
            'codigo':'1702',
            'descripcion':'San José',
            'id_departamento':17
        },
        {
            'codigo':'1703',
            'descripcion':'San Benito',
            'id_departamento':17
        },
        {
            'codigo':'1704',
            'descripcion':'San Andrés',
            'id_departamento':17
        },
        {
            'codigo':'1705',
            'descripcion':'La Libertad',
            'id_departamento':17
        },
        {
            'codigo':'1706',
            'descripcion':'San Francisco',
            'id_departamento':17
        },
        {
            'codigo':'1707',
            'descripcion':'Santa Ana',
            'id_departamento':17
        },
        {
            'codigo':'1708',
            'descripcion':'Dolores',
            'id_departamento':17
        },
        {
            'codigo':'1709',
            'descripcion':'San Luis',
            'id_departamento':17
        },
        {
            'codigo':'1710',
            'descripcion':'Sayaxché',
            'id_departamento':17
        },
        {
            'codigo':'1711',
            'descripcion':'Melchor de Mencos',
            'id_departamento':17
        },
        {
            'codigo':'1712',
            'descripcion':'Poptún',
            'id_departamento':17
        },
        {
            'codigo':'1713',
            'descripcion':'Las Cruces',
            'id_departamento':17
        },
        {
            'codigo':'1714',
            'descripcion':'El Chal',
            'id_departamento':17
        },
        {
            'codigo':'1801',
            'descripcion':'Puerto Barrios',
            'id_departamento':18
        },
        {
            'codigo':'1802',
            'descripcion':'Livingston',
            'id_departamento':18
        },
        {
            'codigo':'1803',
            'descripcion':'El Estor',
            'id_departamento':18
        },
        {
            'codigo':'1804',
            'descripcion':'Morales',
            'id_departamento':18
        },
        {
            'codigo':'1805',
            'descripcion':'Los Amates',
            'id_departamento':18
        },
        {
            'codigo':'1901',
            'descripcion':'Zacapa',
            'id_departamento':19
        },
        {
            'codigo':'1902',
            'descripcion':'Estanzuela',
            'id_departamento':19
        },
        {
            'codigo':'1903',
            'descripcion':'Río Hondo',
            'id_departamento':19
        },
        {
            'codigo':'1904',
            'descripcion':'Gualán',
            'id_departamento':19
        },
        {
            'codigo':'1905',
            'descripcion':'Teculután',
            'id_departamento':19
        },
        {
            'codigo':'1906',
            'descripcion':'Usumatlán',
            'id_departamento':19
        },
        {
            'codigo':'1907',
            'descripcion':'Cabañas',
            'id_departamento':19
        },
        {
            'codigo':'1908',
            'descripcion':'San Diego',
            'id_departamento':19
        },
        {
            'codigo':'1909',
            'descripcion':'La Unión',
            'id_departamento':19
        },
        {
            'codigo':'1910',
            'descripcion':'Huité',
            'id_departamento':19
        },
        {
            'codigo':'1911',
            'descripcion':'San Jorge',
            'id_departamento':19
        },
        {
            'codigo':'2001',
            'descripcion':'Chiquimula',
            'id_departamento':20
        },
        {
            'codigo':'2002',
            'descripcion':'San José La Arada',
            'id_departamento':20
        },
        {
            'codigo':'2003',
            'descripcion':'San Juan Ermita',
            'id_departamento':20
        },
        {
            'codigo':'2004',
            'descripcion':'Jocotán',
            'id_departamento':20
        },
        {
            'codigo':'2005',
            'descripcion':'Camotán',
            'id_departamento':20
        },
        {
            'codigo':'2006',
            'descripcion':'Olopa',
            'id_departamento':20
        },
        {
            'codigo':'2007',
            'descripcion':'Esquipulas',
            'id_departamento':20
        },
        {
            'codigo':'2008',
            'descripcion':'Concepción Las Minas',
            'id_departamento':20
        },
        {
            'codigo':'2009',
            'descripcion':'Quetzaltepeque',
            'id_departamento':20
        },
        {
            'codigo':'2010',
            'descripcion':'San Jacinto',
            'id_departamento':20
        },
        {
            'codigo':'2011',
            'descripcion':'Ipala',
            'id_departamento':20
        },
        {
            'codigo':'2101',
            'descripcion':'Jalapa',
            'id_departamento':21
        },
        {
            'codigo':'2102',
            'descripcion':'San Pedro Pinula',
            'id_departamento':21
        },
        {
            'codigo':'2103',
            'descripcion':'San Luis Jilotepeque',
            'id_departamento':21
        },
        {
            'codigo':'2104',
            'descripcion':'San Manuel Chaparrón',
            'id_departamento':21
        },
        {
            'codigo':'2105',
            'descripcion':'San Carlos Alzatate',
            'id_departamento':21
        },
        {
            'codigo':'2106',
            'descripcion':'Monjas',
            'id_departamento':21
        },
        {
            'codigo':'2107',
            'descripcion':'Mataquescuintla',
            'id_departamento':21
        },
        {
            'codigo':'2201',
            'descripcion':'Jutiapa',
            'id_departamento':22
        },
        {
            'codigo':'2202',
            'descripcion':'El Progreso',
            'id_departamento':22
        },
        {
            'codigo':'2203',
            'descripcion':'Santa Catarina Mita',
            'id_departamento':22
        },
        {
            'codigo':'2204',
            'descripcion':'Agua Blanca',
            'id_departamento':22
        },
        {
            'codigo':'2205',
            'descripcion':'Asunción Mita',
            'id_departamento':22
        },
        {
            'codigo':'2206',
            'descripcion':'Yupiltepeque',
            'id_departamento':22
        },
        {
            'codigo':'2207',
            'descripcion':'Atescatempa',
            'id_departamento':22
        },
        {
            'codigo':'2208',
            'descripcion':'Jerez',
            'id_departamento':22
        },
        {
            'codigo':'2209',
            'descripcion':'El Adelanto',
            'id_departamento':22
        },
        {
            'codigo':'2210',
            'descripcion':'Zapotitlán',
            'id_departamento':22
        },
        {
            'codigo':'2211',
            'descripcion':'Comapa',
            'id_departamento':22
        },
        {
            'codigo':'2212',
            'descripcion':'Jalpatagua',
            'id_departamento':22
        },
        {
            'codigo':'2213',
            'descripcion':'Conguaco',
            'id_departamento':22
        },
        {
            'codigo':'2214',
            'descripcion':'Moyuta',
            'id_departamento':22
        },
        {
            'codigo':'2215',
            'descripcion':'Pasaco',
            'id_departamento':22
        },
        {
            'codigo':'2216',
            'descripcion':'San José Acatempa',
            'id_departamento':22
        },
        {
            'codigo':'2217',
            'descripcion':'Quesada',
            'id_departamento':22
        }
    ]);
};
