'use strict';

const Schwifty = require('schwifty');
const Joi = require('joi');

module.exports = class Cliente extends Schwifty.Model {

    static get tableName() {

        return 'cliente';
    }

    static get joiSchema() {

        return Joi.object({}); // eslint-disable-line no-undef
    }
};
