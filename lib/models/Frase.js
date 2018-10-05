'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Frase extends Schwifty.Model {

    static get tableName() {

        return 'frase';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
