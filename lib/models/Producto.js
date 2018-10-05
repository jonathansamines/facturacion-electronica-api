'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Producto extends Schwifty.Model {

    static get tableName() {

        return 'producto';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
