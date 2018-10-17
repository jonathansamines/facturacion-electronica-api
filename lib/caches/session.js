'use strict';

module.exports = {
    engine: require('catbox-redis'),
    partition: 'facturacion-electronica',
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
};
