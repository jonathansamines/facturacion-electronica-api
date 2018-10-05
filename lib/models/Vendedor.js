'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Vendedor extends Schwifty.Model {

    static get tableName() {

        return 'vendedor';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
